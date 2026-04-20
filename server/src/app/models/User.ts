import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
  INACTIVE = 'INACTIVE',
}

export interface IUser extends Document {
  _id: string;
  email: string;
  phone?: string;
  password?: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Virtual for hostProfile
userSchema.virtual('hostProfile', {
  ref: 'Host',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model<IUser>('User', userSchema);