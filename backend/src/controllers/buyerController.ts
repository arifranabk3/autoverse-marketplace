import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Favorite } from '../models/Favorite';
import { Listing } from '../models/Listing';
import { Comparison } from '../models/Comparison';
import { SavedSearch } from '../models/SavedSearch';
import { Inquiry } from '../models/Inquiry';
import { AppError } from '../middleware/errorHandler';

// --- FAVORITES ---
export async function getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const favorites = await Favorite.find({ userId })
      .populate({
        path: 'listingId',
        populate: { path: 'vehicleId' },
      })
      .sort({ createdAt: -1 });

    const validFavorites = favorites
      .filter((f) => f.listingId != null)
      .map((f) => f.listingId);

    res.status(200).json({
      success: true,
      data: validFavorites,
    });
  } catch (err) {
    next(err);
  }
}

export async function addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { listingId } = req.body;

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
      throw new AppError('Valid listingId is required.', 400, 'INVALID_ID');
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new AppError('Listing not found.', 404, 'NOT_FOUND');
    }

    const fav = await Favorite.findOneAndUpdate(
      { userId, listingId },
      { userId, listingId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      success: true,
      data: fav,
    });
  } catch (err) {
    next(err);
  }
}

export async function removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { listingId } = req.params;

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
      throw new AppError('Valid listingId is required.', 400, 'INVALID_ID');
    }

    await Favorite.findOneAndDelete({ userId, listingId });

    res.status(200).json({
      success: true,
      message: 'Favorite removed successfully.',
    });
  } catch (err) {
    next(err);
  }
}

// --- COMPARISONS ---
export async function getComparisons(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    let comparison = await Comparison.findOne({ userId }).populate({
      path: 'listingIds',
      populate: { path: 'vehicleId' },
    });

    res.status(200).json({
      success: true,
      data: comparison ? comparison.listingIds : [],
    });
  } catch (err) {
    next(err);
  }
}

export async function addComparison(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { listingId } = req.body;

    if (!listingId || !mongoose.Types.ObjectId.isValid(listingId)) {
      throw new AppError('Valid listingId is required.', 400, 'INVALID_ID');
    }

    let comparison = await Comparison.findOne({ userId });
    if (!comparison) {
      comparison = new Comparison({ userId, listingIds: [listingId] });
    } else {
      if (!comparison.listingIds.some((id) => id.toString() === listingId)) {
        if (comparison.listingIds.length >= 4) {
          throw new AppError('Maximum comparison limit of 4 vehicles reached.', 400, 'LIMIT_EXCEEDED');
        }
        comparison.listingIds.push(new mongoose.Types.ObjectId(listingId));
      }
    }
    await comparison.save();

    const populated = await Comparison.findById(comparison._id).populate({
      path: 'listingIds',
      populate: { path: 'vehicleId' },
    });

    res.status(200).json({
      success: true,
      data: populated?.listingIds || [],
    });
  } catch (err) {
    next(err);
  }
}

export async function removeComparison(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { listingId } = req.params;

    const comparison = await Comparison.findOne({ userId });
    if (comparison) {
      comparison.listingIds = comparison.listingIds.filter((id) => id.toString() !== listingId);
      await comparison.save();
    }

    res.status(200).json({
      success: true,
      message: 'Comparison removed.',
    });
  } catch (err) {
    next(err);
  }
}

// --- SAVED SEARCHES ---
export async function getSavedSearches(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const searches = await SavedSearch.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: searches,
    });
  } catch (err) {
    next(err);
  }
}

export async function createSavedSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { name, filters, notifyOnMatch } = req.body;

    if (!name) {
      throw new AppError('Saved search name is required.', 400, 'VALIDATION_ERROR');
    }

    const saved = await SavedSearch.create({
      userId,
      name: name.trim(),
      filters: filters || {},
      notifyOnMatch: Boolean(notifyOnMatch),
    });

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSavedSearch(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    await SavedSearch.findOneAndDelete({ _id: id, userId });
    res.status(200).json({
      success: true,
      message: 'Saved search deleted.',
    });
  } catch (err) {
    next(err);
  }
}

// --- INQUIRIES ---
export async function createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { vehicleName, name, email, phone, message, financingInterest, tradeInInterest, listingId, dealerId } = req.body;

    if (!vehicleName || !name || !email || !phone || !message) {
      throw new AppError('Vehicle name, name, email, phone, and message are required.', 400, 'VALIDATION_ERROR');
    }

    const inquiry = await Inquiry.create({
      buyerId: req.user?.userId ? new mongoose.Types.ObjectId(req.user.userId) : undefined,
      dealerId: dealerId && mongoose.Types.ObjectId.isValid(dealerId) ? new mongoose.Types.ObjectId(dealerId) : undefined,
      listingId: listingId && mongoose.Types.ObjectId.isValid(listingId) ? new mongoose.Types.ObjectId(listingId) : undefined,
      vehicleName,
      name,
      email: email.toLowerCase().trim(),
      phone,
      message,
      financingInterest: Boolean(financingInterest),
      tradeInInterest: Boolean(tradeInInterest),
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry transmitted to concierge and dealer successfully.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getBuyerInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!.userId;
    const inquiries = await Inquiry.find({
      $or: [{ buyerId: userId }, { email: req.user!.email }],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (err) {
    next(err);
  }
}

