import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  userId: mongoose.Types.ObjectId;
  listingId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'favorites',
  }
);

// Prevent duplicate favorites per user
FavoriteSchema.index({ userId: 1, listingId: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);
