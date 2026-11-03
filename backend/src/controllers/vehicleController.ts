import { Request, Response, NextFunction } from 'express';
import { Vehicle } from '../models/Vehicle';
import { AppError } from '../middleware/errorHandler';

export async function getVehicles(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 12));
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (req.query.make && req.query.make !== 'All') {
      filter.make = new RegExp(`^${req.query.make}$`, 'i');
    }
    if (req.query.bodyType && req.query.bodyType !== 'All') {
      filter.bodyType = req.query.bodyType;
    }
    if (req.query.fuelType && req.query.fuelType !== 'All') {
      filter.fuelType = req.query.fuelType;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    const sortOption: Record<string, any> = {};
    const sortBy = req.query.sortBy as string;
    if (sortBy === 'price_asc') sortOption.price = 1;
    else if (sortBy === 'price_desc') sortOption.price = -1;
    else if (sortBy === 'year_desc') sortOption.year = -1;
    else if (sortBy === 'mileage_asc') sortOption.mileage = 1;
    else sortOption.createdAt = -1;

    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Vehicle.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: vehicles,
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

export async function getVehicleById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const vehicle = await Vehicle.findById(req.params.id).lean();
    if (!vehicle) {
      throw new AppError('Vehicle record not found', 404);
    }
    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
}
