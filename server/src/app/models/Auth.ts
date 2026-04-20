import mongoose, { Schema, Document } from 'mongoose';

export enum AuthProvider {
  google = 'google',
  credentials = 'credentials',
}

export interface IAuth extends Document {
  _id: string;
  provider: AuthProvider;
  providerId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const authSchema = new Schema<IAuth>(
  {
    provider: { type: String, enum: Object.values(AuthProvider), required: true },
    providerId: { type: String, required: true },
    userId: { type: String, required: true, ref: 'User' },
  },
  { timestamps: true }
);

export const Auth = mongoose.model<IAuth>('Auth', authSchema);