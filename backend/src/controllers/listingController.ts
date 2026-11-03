import { Request, Response, NextFunction } from 'express';
import { Listing } from '../models/Listing';
import { Vehicle } from '../models/Vehicle';
import { AppError } from '../middleware/errorHandler';

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const rand = Math.random().toString(36).substring(2, 7);
  return `${base}-${rand}`;
}

export async function getListings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12));
    const skip = (page - 1) * limit;

    // Public users only see 'active' listings
    const filter: Record<string, any> = { status: 'active' };

    if (req.query.featured === 'true') {
      filter.featured = true;
    }
    if (req.query.city) {
      filter.city = new RegExp(`^${String(req.query.city).trim()}$`, 'i');
    }
    if (req.query.province) {
      filter.province = new RegExp(`^${String(req.query.province).trim()}$`, 'i');
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // Keyword search on title, description, location
    if (req.query.search) {
      const searchRegex = new RegExp(String(req.query.search).trim(), 'i');
      filter.$or = [{ title: searchRegex }, { description: searchRegex }, { location: searchRegex }];
    }

    const sortOption: Record<string, any> = {};
    const sortBy = req.query.sortBy as string;
    if (sortBy === 'price_asc') sortOption.price = 1;
    else if (sortBy === 'price_desc') sortOption.price = -1;
    else if (sortBy === 'featured') {
      sortOption.featured = -1;
      sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .populate('vehicleId')
        .populate('dealerId', 'businessName slug rating logo location')
        .populate('sellerId', 'name email role')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
      Listing.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getListingById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('vehicleId')
      .populate('dealerId', 'businessName slug rating reviewsCount contactDetails location logo bannerImage')
      .populate('sellerId', 'name email role phone')
      .lean();

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    // If listing is not active, only owner or admin can view
    if (listing.status !== 'active') {
      const user = req.user;
      const isOwner = user && user.userId === String(listing.sellerId._id);
      const isAdmin = user && user.role === 'admin';
      if (!isOwner && !isAdmin) {
        throw new AppError('Listing is not currently public.', 403);
      }
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
}

export async function createListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sellerId = req.user!.userId;
    const { vehicleId, title, price, description, location, city, province, images, dealerId, status, featured } = req.body;

    // Validate Vehicle Existence
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      throw new AppError('Referenced vehicleId does not exist in vehicles catalog.', 400);
    }

    const slug = generateSlug(title);

    const listing = await Listing.create({
      vehicleId,
      sellerId,
      dealerId: req.user!.role === 'dealer' ? dealerId : undefined,
      title,
      slug,
      description,
      price,
      currency: 'USD',
      location,
      city,
      province,
      images,
      status: status || 'draft',
      featured: req.user!.role === 'admin' ? Boolean(featured) : false,
      publishedAt: status === 'active' ? new Date() : undefined,
    });

    res.status(201).json({
      success: true,
      message: 'Listing published successfully.',
      data: listing,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    const isOwner = req.user!.userId === String(listing.sellerId);
    const isAdmin = req.user!.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new AppError('Unauthorized: You can only update your own listings.', 403);
    }

    // Prevent unauthorized status modification via standard PATCH
    const updateData = { ...req.body };
    delete updateData.sellerId;
    delete updateData.vehicleId;

    const updated = await Listing.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true })
      .populate('vehicleId')
      .lean();

    res.status(200).json({
      success: true,
      message: 'Listing updated.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateListingStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body;
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    const isOwner = req.user!.userId === String(listing.sellerId);
    const isAdmin = req.user!.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new AppError('Unauthorized to update listing status.', 403);
    }

    listing.status = status;
    if (status === 'active' && !listing.publishedAt) {
      listing.publishedAt = new Date();
    }
    await listing.save();

    res.status(200).json({
      success: true,
      message: `Listing status updated to '${status}'.`,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteListing(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    const isOwner = req.user!.userId === String(listing.sellerId);
    const isAdmin = req.user!.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new AppError('Unauthorized: You can only delete your own listings.', 403);
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Listing removed successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyListings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const sellerId = req.user!.userId;
    const listings = await Listing.find({ sellerId })
      .populate('vehicleId')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
}
