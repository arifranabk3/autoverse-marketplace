import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Dealer } from '../models/Dealer';
import { Listing } from '../models/Listing';
import { Vehicle } from '../models/Vehicle';
import { Inquiry } from '../models/Inquiry';
import { AppError } from '../middleware/errorHandler';

// Get Public Dealers
export async function getDealers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dealers = await Dealer.find({ verificationStatus: 'verified' })
      .populate('userId', 'name email phone avatar')
      .sort({ rating: -1, reviewsCount: -1 });

    res.status(200).json({
      success: true,
      data: dealers,
    });
  } catch (err) {
    next(err);
  }
}

// Get Dealer by ID or Slug
export async function getDealerById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const dealer = await Dealer.findOne(query).populate('userId', 'name email phone avatar');
    if (!dealer) {
      throw new AppError('Dealer profile not found.', 404, 'NOT_FOUND');
    }

    const inventory = await Listing.find({
      dealerId: dealer._id,
      status: { $in: ['active', 'sold'] },
    }).populate('vehicleId');

    res.status(200).json({
      success: true,
      data: {
        dealer,
        inventory,
      },
    });
  } catch (err) {
    next(err);
  }
}

// Get Current Dealer Portal Stats & Overview
export async function getDealerDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const dealer = await Dealer.findOne({ userId });

    const filter: any = dealer ? { dealerId: dealer._id } : { sellerId: userId };

    const totalInventory = await Listing.countDocuments(filter);
    const activeListings = await Listing.countDocuments({ ...filter, status: 'active' });
    const pendingApproval = await Listing.countDocuments({ ...filter, status: 'pending' });
    const soldListings = await Listing.countDocuments({ ...filter, status: 'sold' });

    const inquiriesQuery: any = dealer ? { $or: [{ dealerId: dealer._id }, { buyerId: userId }] } : { buyerId: userId };
    const totalInquiries = await Inquiry.countDocuments(inquiriesQuery);
    const pendingInquiries = await Inquiry.countDocuments({ ...inquiriesQuery, status: 'pending' });

    const recentInquiries = await Inquiry.find(inquiriesQuery).sort({ createdAt: -1 }).limit(5);
    const recentListings = await Listing.find(filter).populate('vehicleId').sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalInventory,
          activeListings,
          pendingApproval,
          soldListings,
          totalInquiries,
          pendingInquiries,
          showroomViews: 12450,
          conversionRate: '3.8%',
        },
        recentInquiries,
        recentListings,
      },
    });
  } catch (err) {
    next(err);
  }
}

// Get Dealer Leads / Inquiries
export async function getDealerLeads(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const dealer = await Dealer.findOne({ userId });

    const filter: any = dealer ? { $or: [{ dealerId: dealer._id }, { buyerId: userId }] } : { buyerId: userId };

    const { status } = req.query;
    if (status && status !== 'all') {
      filter.status = status;
    }

    const leads = await Inquiry.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (err) {
    next(err);
  }
}

// Update Lead Status & Notes
export async function updateLeadStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, dealerNotes } = req.body;

    const lead = await Inquiry.findById(id);
    if (!lead) {
      throw new AppError('Inquiry lead record not found.', 404, 'NOT_FOUND');
    }

    if (status) lead.status = status;
    if (dealerNotes !== undefined) lead.dealerNotes = dealerNotes;

    await lead.save();

    res.status(200).json({
      success: true,
      data: lead,
      message: 'Lead updated successfully.',
    });
  } catch (err) {
    next(err);
  }
}

// Update Dealer Profile
export async function updateDealerProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    let dealer = await Dealer.findOne({ userId });

    const { businessName, description, phone, email, website, address, city, state, country, logo, bannerImage } = req.body;

    if (!dealer) {
      dealer = new Dealer({
        userId,
        businessName: businessName || 'Dealership Showroom',
        slug: (businessName || 'dealer').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description || 'Authorized luxury dealer',
        contactDetails: { phone: phone || '', email: email || '', website: website || '' },
        location: { address: address || '', city: city || '', state: state || '', country: country || 'USA' },
        verificationStatus: 'verified',
        rating: 5.0,
        reviewsCount: 1,
      });
    }

    if (businessName) dealer.businessName = businessName.trim();
    if (description) dealer.description = description;
    if (phone) dealer.contactDetails.phone = phone;
    if (email) dealer.contactDetails.email = email;
    if (website !== undefined) dealer.contactDetails.website = website;
    if (address) dealer.location.address = address;
    if (city) dealer.location.city = city;
    if (state) dealer.location.state = state;
    if (country) dealer.location.country = country;
    if (logo) dealer.logo = logo;
    if (bannerImage) dealer.bannerImage = bannerImage;

    await dealer.save();

    res.status(200).json({
      success: true,
      data: dealer,
      message: 'Dealership profile updated successfully.',
    });
  } catch (err) {
    next(err);
  }
}
