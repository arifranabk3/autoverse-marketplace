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
      filter.make = new RegExp(`^${String(req.query.make).trim()}$`, 'i');
    }
    if (req.query.model && req.query.model !== 'All') {
      filter.model = new RegExp(`^${String(req.query.model).trim()}$`, 'i');
    }
    if (req.query.bodyType && req.query.bodyType !== 'All') {
      filter.bodyType = req.query.bodyType;
    }
    if (req.query.fuelType && req.query.fuelType !== 'All') {
      filter.fuelType = req.query.fuelType;
    }
    if (req.query.transmission && req.query.transmission !== 'All') {
      filter.transmission = req.query.transmission;
    }
    if (req.query.condition && req.query.condition !== 'All') {
      filter.condition = req.query.condition;
    }

    // Numeric ranges
    if (req.query.minYear || req.query.maxYear) {
      filter.year = {};
      if (req.query.minYear) filter.year.$gte = Number(req.query.minYear);
      if (req.query.maxYear) filter.year.$lte = Number(req.query.maxYear);
    }

    if (req.query.minMileage || req.query.maxMileage) {
      filter.mileage = {};
      if (req.query.minMileage) filter.mileage.$gte = Number(req.query.minMileage);
      if (req.query.maxMileage) filter.mileage.$lte = Number(req.query.maxMileage);
    }

    // Keyword Search
    if (req.query.search) {
      const regex = new RegExp(String(req.query.search).trim(), 'i');
      filter.$or = [{ make: regex }, { model: regex }, { variant: regex }, { vin: regex }];
    }

    const sortOption: Record<string, any> = {};
    const sortBy = req.query.sortBy as string;
    if (sortBy === 'year_desc') sortOption.year = -1;
    else if (sortBy === 'year_asc') sortOption.year = 1;
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
      throw new AppError('Vehicle specification record not found', 404);
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
}

export async function createVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const newVehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Vehicle specification created successfully.',
      data: newVehicle,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true }).lean();
    if (!updated) {
      throw new AppError('Vehicle not found to update', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle specifications updated.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteVehicle(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id).lean();
    if (!deleted) {
      throw new AppError('Vehicle not found to delete', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}
