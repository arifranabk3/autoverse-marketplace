import { z } from 'zod';

export const CreateVehicleSchema = z.object({
  body: z.object({
    make: z.string().min(1, 'Make is required').trim(),
    model: z.string().min(1, 'Model is required').trim(),
    variant: z.string().optional(),
    year: z.number().int().min(1900).max(2050),
    bodyType: z.enum(['Coupe', 'Sedan', 'SUV', 'Convertible', 'Hypercar', 'Truck', 'Wagon']),
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
    transmission: z.enum(['Automatic', 'Manual', 'Dual-Clutch']),
    engineCapacity: z.string().optional(),
    mileage: z.number().min(0, 'Mileage cannot be negative'),
    exteriorColor: z.string().optional(),
    interiorColor: z.string().optional(),
    condition: z.enum(['Brand New', 'Certified Pre-Owned', 'Used']).default('Certified Pre-Owned'),
    doors: z.number().int().min(1).max(8).optional(),
    seats: z.number().int().min(1).max(20).optional(),
    horsepower: z.number().min(0).optional(),
    acceleration: z.string().optional(),
    topSpeed: z.string().optional(),
    vin: z.string().optional(),
    specifications: z.record(z.any()).optional().default({}),
    features: z.array(z.string()).optional().default([]),
    images: z.array(z.string().url()).optional().default([]),
  }),
});

export const UpdateVehicleSchema = z.object({
  body: CreateVehicleSchema.shape.body.partial(),
});

export const CreateListingSchema = z.object({
  body: z.object({
    vehicleId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid vehicle ObjectId'),
    dealerId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid dealer ObjectId').optional(),
    title: z.string().min(3, 'Title must be at least 3 characters').trim(),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be greater than zero'),
    currency: z.string().default('USD'),
    location: z.string().min(2, 'Location is required').trim(),
    city: z.string().min(2, 'City is required').trim(),
    province: z.string().min(2, 'Province/State is required').trim(),
    images: z.array(z.string().url()).optional().default([]),
    status: z.enum(['draft', 'pending', 'active', 'rejected', 'sold', 'archived']).default('draft'),
    featured: z.boolean().optional().default(false),
  }),
});

export const UpdateListingSchema = z.object({
  body: CreateListingSchema.shape.body.partial(),
});

export const UpdateListingStatusSchema = z.object({
  body: z.object({
    status: z.enum(['draft', 'pending', 'active', 'rejected', 'sold', 'archived']),
  }),
});

