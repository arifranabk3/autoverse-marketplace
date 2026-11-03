import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  dealerId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dealerId: { type: Schema.Types.ObjectId, ref: 'Dealer', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: 'reviews',
  }
);

ReviewSchema.index({ dealerId: 1, createdAt: -1 });

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
