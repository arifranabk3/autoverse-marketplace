import { Request, Response, NextFunction } from 'express';
import { Listing } from '../models/Listing';

export async function getListings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12));
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = { status: 'active' };

    if (req.query.featured === 'true') {
      filter.featured = true;
    }
    if (req.query.location) {
      filter.location = new RegExp(req.query.location as string, 'i');
    }

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .populate('vehicleId')
        .populate('dealerId', 'businessName slug rating logo location')
        .sort({ featured: -1, createdAt: -1 })
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
