import mongoose, { Document, Schema } from 'mongoose';

export type ListingStatus = 'draft' | 'pending' | 'active' | 'rejected' | 'sold' | 'archived';

export interface IListing extends Document {
  vehicleId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  dealerId?: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  province: string;
  images: string[];
  status: ListingStatus;
  featured: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dealerId: { type: Schema.Types.ObjectId, ref: 'Dealer', index: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0, index: true },
    currency: { type: String, default: 'USD', uppercase: true, trim: true },
    location: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    province: { type: String, required: true, trim: true, index: true },
    images: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['draft', 'pending', 'active', 'rejected', 'sold', 'archived'],
      default: 'draft',
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'listings',
  }
);

// Slug uniqueness index
ListingSchema.index({ slug: 1 }, { unique: true });

// Compound indexes for search, status, and geo filtering
ListingSchema.index({ status: 1, featured: -1, createdAt: -1 });
ListingSchema.index({ status: 1, price: 1 });
ListingSchema.index({ status: 1, city: 1, province: 1 });
ListingSchema.index({ sellerId: 1, status: 1 });
ListingSchema.index({ dealerId: 1, status: 1 });

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);
