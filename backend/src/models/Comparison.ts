import mongoose, { Document, Schema } from 'mongoose';

export interface IComparison extends Document {
  userId: mongoose.Types.ObjectId;
  listingIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ComparisonSchema = new Schema<IComparison>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listingIds: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
  },
  {
    timestamps: true,
    collection: 'comparisons',
  }
);

ComparisonSchema.index({ userId: 1 });

export const Comparison = mongoose.model<IComparison>('Comparison', ComparisonSchema);
