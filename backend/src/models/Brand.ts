import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  slug: string;
  country: string;
  founded: number;
  description: string;
  logo: string;
  heroImage: string;
  vehicleCount: number;
  popularModels: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    country: { type: String, required: true, trim: true },
    founded: { type: Number, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    heroImage: { type: String, required: true },
    vehicleCount: { type: Number, default: 0 },
    popularModels: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
    collection: 'brands',
  }
);

BrandSchema.index({ slug: 1 }, { unique: true });
BrandSchema.index({ name: 1 });

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);

