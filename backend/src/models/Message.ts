import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  conversationId: string;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: String, required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    message: { type: String, required: true, trim: true },
    readAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'messages',
  }
);

MessageSchema.index({ conversationId: 1, createdAt: 1 });
MessageSchema.index({ receiverId: 1, readAt: 1 });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
