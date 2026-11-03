import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  vehicleId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  dealerId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  location: string;
  status: 'active' | 'pending' | 'sold' | 'draft';
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dealerId: { type: Schema.Types.ObjectId, ref: 'Dealer', index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'pending', 'sold', 'draft'], default: 'active' },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'listings',
  }
);

// Indexes
ListingSchema.index({ status: 1 });
ListingSchema.index({ price: 1 });
ListingSchema.index({ location: 1 });
ListingSchema.index({ featured: 1, status: 1 });
ListingSchema.index({ createdAt: -1 });

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);
