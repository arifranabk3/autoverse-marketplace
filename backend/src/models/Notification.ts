import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'inquiry' | 'price_alert' | 'escrow' | 'system';
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: { type: String, enum: ['inquiry', 'price_alert', 'escrow', 'system'], default: 'system' },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'notifications',
  }
);

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
