import mongoose, { Schema, Document } from 'mongoose';

export interface IHost extends Document {
  _id: string;
  userId: string;
  businessName?: string;
  nidNumber?: string;
  isApproved: boolean;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const hostSchema = new Schema<IHost>(
  {
    userId: { type: String, required: true, unique: true, ref: 'User' },
    businessName: { type: String },
    nidNumber: { type: String },
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

export const Host = mongoose.model<IHost>('Host', hostSchema);