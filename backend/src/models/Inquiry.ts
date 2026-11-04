import mongoose, { Document, Schema } from 'mongoose';

export type InquiryStatus = 'pending' | 'in_review' | 'contacted' | 'resolved' | 'closed';

export interface IInquiry extends Document {
  buyerId?: mongoose.Types.ObjectId;
  dealerId?: mongoose.Types.ObjectId;
  listingId?: mongoose.Types.ObjectId;
  vehicleName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  financingInterest?: boolean;
  tradeInInterest?: boolean;
  status: InquiryStatus;
  dealerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    dealerId: { type: Schema.Types.ObjectId, ref: 'Dealer', index: true },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing', index: true },
    vehicleName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    financingInterest: { type: Boolean, default: false },
    tradeInInterest: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'in_review', 'contacted', 'resolved', 'closed'],
      default: 'pending',
      index: true,
    },
    dealerNotes: { type: String, trim: true },
  },
  {
    timestamps: true,
    collection: 'inquiries',
  }
);

InquirySchema.index({ dealerId: 1, createdAt: -1 });
InquirySchema.index({ buyerId: 1, createdAt: -1 });
InquirySchema.index({ status: 1 });

export const Inquiry = mongoose.model<IInquiry>('Inquiry', InquirySchema);

