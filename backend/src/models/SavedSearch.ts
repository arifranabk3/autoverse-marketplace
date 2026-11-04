import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedSearch extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  filters: Record<string, any>;
  notifyOnMatch: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SavedSearchSchema = new Schema<ISavedSearch>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    filters: { type: Schema.Types.Mixed, default: {} },
    notifyOnMatch: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'saved_searches',
  }
);

SavedSearchSchema.index({ userId: 1, createdAt: -1 });

export const SavedSearch = mongoose.model<ISavedSearch>('SavedSearch', SavedSearchSchema);

