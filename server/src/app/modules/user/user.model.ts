import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '../../config/env';

export enum UserRole {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false },
        phone: { type: String, trim: true },
        avatar: { type: String },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.ADMIN,
        },
        status: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.ACTIVE,
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Pre-save hook: hash password if modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, Number(env.BCRYPT_SALT_ROUNDS));
    next();
});

// Query middleware: exclude soft-deleted by default
userSchema.pre('find', function () {
    this.where({ isDeleted: false });
});
userSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});
userSchema.pre('countDocuments', function () {
    this.where({ isDeleted: false });
});

// Index for quick lookups
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

export const User = mongoose.model<IUser>('User', userSchema);