import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'buyer' | 'dealer' | 'admin';
  phone?: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'dealer', 'admin'], default: 'buyer' },
    phone: { type: String, trim: true },
    avatar: { type: String, trim: true },
    status: { type: String, enum: ['active', 'suspended', 'pending'], default: 'active' },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
