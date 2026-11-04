import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Dealer } from '../models/Dealer';
import { Listing } from '../models/Listing';
import { Vehicle } from '../models/Vehicle';
import { Brand } from '../models/Brand';
import { Review } from '../models/Review';
import { Report } from '../models/Report';
import { AuditLog } from '../models/AuditLog';
import { AppError } from '../middleware/errorHandler';

// Get Admin Overview Stats
export async function getAdminDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const totalUsers = await User.countDocuments();
    const totalDealers = await Dealer.countDocuments();
    const totalListings = await Listing.countDocuments();
    const pendingListings = await Listing.countDocuments({ status: 'pending' });
    const pendingReports = await Report.countDocuments({ status: 'pending' });
    const totalVehicles = await Vehicle.countDocuments();

    const recentListings = await Listing.find().populate('vehicleId').sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().select('-passwordHash').sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalDealers,
          totalListings,
          pendingListings,
          pendingReports,
          totalVehicles,
          grossMarketplaceVolume: '$14,290,000',
        },
        recentListings,
        recentUsers,
      },
    });
  } catch (err) {
    next(err);
  }
}

// User Management
export async function getAdminUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { role, status, search } = req.query;
    const filter: any = {};

    if (role && role !== 'all') filter.role = role;
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).select('-passwordHash').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found.', 404, 'NOT_FOUND');
    }

    if (status) user.status = status;
    if (role) user.role = role;

    await user.save();

    await AuditLog.create({
      actorId: new mongoose.Types.ObjectId(req.user!.userId),
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'UPDATE_USER_STATUS',
      targetType: 'user',
      targetId: user._id,
      details: { newStatus: status, newRole: role },
    });

    res.status(200).json({
      success: true,
      data: user,
      message: 'User account updated successfully.',
    });
  } catch (err) {
    next(err);
  }
}

// Dealer Verification & Moderation
export async function updateDealerVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { verificationStatus } = req.body;

    const dealer = await Dealer.findById(id);
    if (!dealer) {
      throw new AppError('Dealer not found.', 404, 'NOT_FOUND');
    }

    dealer.verificationStatus = verificationStatus;
    await dealer.save();

    await AuditLog.create({
      actorId: new mongoose.Types.ObjectId(req.user!.userId),
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'UPDATE_DEALER_VERIFICATION',
      targetType: 'dealer',
      targetId: dealer._id,
      details: { verificationStatus },
    });

    res.status(200).json({
      success: true,
      data: dealer,
      message: `Dealer status set to ${verificationStatus}.`,
    });
  } catch (err) {
    next(err);
  }
}

// Listing Moderation (Approve / Reject / Suspend)
export async function moderateListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      throw new AppError('Listing not found.', 404, 'NOT_FOUND');
    }

    listing.status = status;
    if (status === 'active') {
      listing.publishedAt = new Date();
    }
    await listing.save();

    await AuditLog.create({
      actorId: new mongoose.Types.ObjectId(req.user!.userId),
      actorEmail: req.user!.email,
      actorRole: req.user!.role,
      action: 'MODERATE_LISTING',
      targetType: 'listing',
      targetId: listing._id,
      details: { status, reason },
    });

    res.status(200).json({
      success: true,
      data: listing,
      message: `Listing status updated to ${status}.`,
    });
  } catch (err) {
    next(err);
  }
}

// Reports Moderation
export async function getAdminReports(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.query;
    const filter: any = {};
    if (status && status !== 'all') filter.status = status;

    const reports = await Report.find(filter)
      .populate('reporterId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (err) {
    next(err);
  }
}

export async function resolveReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const report = await Report.findById(id);
    if (!report) {
      throw new AppError('Report not found.', 404, 'NOT_FOUND');
    }

    report.status = status;
    if (adminNotes !== undefined) report.adminNotes = adminNotes;
    report.resolvedBy = new mongoose.Types.ObjectId(req.user!.userId);
    report.resolvedAt = new Date();

    await report.save();

    res.status(200).json({
      success: true,
      data: report,
      message: 'Report status updated.',
    });
  } catch (err) {
    next(err);
  }
}

// Brand CRUD
export async function getBrands(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (err) {
    next(err);
  }
}

export async function createBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, country, founded, description, logo, heroImage, popularModels } = req.body;

    if (!name || !logo) {
      throw new AppError('Brand name and logo are required.', 400, 'VALIDATION_ERROR');
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const brand = await Brand.create({
      name: name.trim(),
      slug,
      country: country || 'International',
      founded: founded || 2000,
      description: description || 'Luxury and high performance automaker.',
      logo,
      heroImage: heroImage || logo,
      popularModels: popularModels || [],
    });

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!brand) {
      throw new AppError('Brand not found.', 404, 'NOT_FOUND');
    }
    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Brand deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
}

