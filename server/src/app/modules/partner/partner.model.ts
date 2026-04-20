import mongoose, { Schema, Document } from 'mongoose';

export enum PartnerType {
    BUYER = 'BUYER',
    SUPPLIER = 'SUPPLIER',
    DISTRIBUTOR = 'DISTRIBUTOR',
    OTHER = 'OTHER',
}

export interface IPartner extends Document {
    name: string;
    logo?: string;
    country?: string;
    website?: string;
    description?: string;
    partnerType: PartnerType;
    sortOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>(
    {
        name: { type: String, required: true, trim: true },
        logo: { type: String },
        country: { type: String, trim: true },
        website: { type: String, trim: true },
        description: { type: String, trim: true },
        partnerType: {
            type: String,
            enum: Object.values(PartnerType),
            default: PartnerType.OTHER,
        },
        sortOrder: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

partnerSchema.index({ partnerType: 1, isActive: 1 });

partnerSchema.pre('find', function () { this.where({ isDeleted: false }); });
partnerSchema.pre('findOne', function () { this.where({ isDeleted: false }); });
partnerSchema.pre('countDocuments', function () { this.where({ isDeleted: false }); });

export const Partner = mongoose.model<IPartner>('Partner', partnerSchema);
