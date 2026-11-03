import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle {
  _id?: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'Dual-Clutch';
  condition: 'Brand New' | 'Certified Pre-Owned' | 'Used';
  bodyType: 'Coupe' | 'Sedan' | 'SUV' | 'Convertible' | 'Hypercar';
  vin?: string;
  horsepower?: number;
  acceleration?: string;
  topSpeed?: string;
  exteriorColor?: string;
  interiorColor?: string;
  specifications: Record<string, any>;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900, max: 2050 },
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, required: true, min: 0 },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual', 'Dual-Clutch'], required: true },
    condition: { type: String, enum: ['Brand New', 'Certified Pre-Owned', 'Used'], default: 'Certified Pre-Owned' },
    bodyType: { type: String, enum: ['Coupe', 'Sedan', 'SUV', 'Convertible', 'Hypercar'], required: true },
    vin: { type: String, trim: true },
    horsepower: { type: Number },
    acceleration: { type: String, trim: true },
    topSpeed: { type: String, trim: true },
    exteriorColor: { type: String, trim: true },
    interiorColor: { type: String, trim: true },
    specifications: { type: Schema.Types.Mixed, default: {} },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: 'vehicles',
  }
);

// High-performance compound indexes for search & filtering
VehicleSchema.index({ make: 1, model: 1 });
VehicleSchema.index({ year: -1 });
VehicleSchema.index({ price: 1 });
VehicleSchema.index({ mileage: 1 });
VehicleSchema.index({ bodyType: 1 });
VehicleSchema.index({ fuelType: 1 });

export const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
