import mongoose, { Document, Schema } from 'mongoose';

export interface IDealer extends Document {
  userId: mongoose.Types.ObjectId;
  businessName: string;
  slug: string;
  description: string;
  contactDetails: {
    phone: string;
    email: string;
    website?: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  verificationStatus: 'verified' | 'pending' | 'rejected';
  rating: number;
  reviewsCount: number;
  logo?: string;
  bannerImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DealerSchema = new Schema<IDealer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    businessName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    contactDetails: {
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      website: { type: String, trim: true },
    },
    location: {
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, default: 'USA', trim: true },
    },
    verificationStatus: { type: String, enum: ['verified', 'pending', 'rejected'], default: 'pending' },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0 },
    logo: { type: String, trim: true },
    bannerImage: { type: String, trim: true },
  },
  {
    timestamps: true,
    collection: 'dealers',
  }
);

// Indexes
DealerSchema.index({ slug: 1 }, { unique: true });
DealerSchema.index({ verificationStatus: 1 });
DealerSchema.index({ 'location.city': 1, 'location.state': 1 });

export const Dealer = mongoose.model<IDealer>('Dealer', DealerSchema);
