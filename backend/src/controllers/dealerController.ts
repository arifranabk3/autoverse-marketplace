import { Request, Response, NextFunction } from 'express';
import { Dealer } from '../models/Dealer';
import { AppError } from '../middleware/errorHandler';

export async function getDealers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.verified === 'true') {
      filter.verificationStatus = 'verified';
    }

    const [dealers, total] = await Promise.all([
      Dealer.find(filter)
        .select('-__v')
        .sort({ rating: -1, reviewsCount: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Dealer.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: dealers,
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
