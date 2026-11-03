import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle {
  _id?: mongoose.Types.ObjectId;
  make: string;
  model: string;
  variant?: string;
  year: number;
  bodyType: 'Coupe' | 'Sedan' | 'SUV' | 'Convertible' | 'Hypercar' | 'Truck' | 'Wagon';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch';
  engineCapacity?: string;
  mileage: number;
  exteriorColor?: string;
  interiorColor?: string;
  condition: 'Brand New' | 'Certified Pre-Owned' | 'Used';
  doors?: number;
  seats?: number;
  horsepower?: number;
  acceleration?: string;
  topSpeed?: string;
  vin?: string;
  specifications: Record<string, any>;
  features: string[];
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    make: { type: String, required: true, trim: true, index: true },
    model: { type: String, required: true, trim: true, index: true },
    variant: { type: String, trim: true },
    year: { type: Number, required: true, min: 1900, max: 2050, index: true },
    bodyType: {
      type: String,
      enum: ['Coupe', 'Sedan', 'SUV', 'Convertible', 'Hypercar', 'Truck', 'Wagon'],
      required: true,
      index: true,
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      required: true,
      index: true,
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual', 'Dual-Clutch'],
      required: true,
    },
    engineCapacity: { type: String, trim: true },
    mileage: { type: Number, required: true, min: 0, index: true },
    exteriorColor: { type: String, trim: true },
    interiorColor: { type: String, trim: true },
    condition: {
      type: String,
      enum: ['Brand New', 'Certified Pre-Owned', 'Used'],
      default: 'Certified Pre-Owned',
      index: true,
    },
    doors: { type: Number, min: 1, max: 8 },
    seats: { type: Number, min: 1, max: 20 },
    horsepower: { type: Number, min: 0 },
    acceleration: { type: String, trim: true },
    topSpeed: { type: String, trim: true },
    vin: { type: String, trim: true },
    specifications: { type: Schema.Types.Mixed, default: {} },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: 'vehicles',
  }
);

// High performance compound indexes for catalog and search
VehicleSchema.index({ make: 1, model: 1 });
VehicleSchema.index({ make: 1, year: -1 });
VehicleSchema.index({ bodyType: 1, condition: 1 });
VehicleSchema.index({ fuelType: 1, transmission: 1 });
VehicleSchema.index({ createdAt: -1 });

export const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
