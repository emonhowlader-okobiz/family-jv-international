import { AppError } from "../../errors/AppError";
import { Partner } from "./partner.model";
import { uploadSingleImage, deleteImage, extractPublicId } from "../../config/cloudinary";
import { calculatePagination } from "../../utils/calculatePagination";
import type { TPaginationOptions } from "../../types/pagination";
import type { CreatePartnerInput, UpdatePartnerInput } from "./partner.validation";

const createPartner = async (data: CreatePartnerInput, file?: Express.Multer.File) => {
    let logoUrl: string | undefined;

    if (file) {
        const uploadResult = await uploadSingleImage(file);
        logoUrl = uploadResult.secure_url || uploadResult.url;
    }

    const partner = await Partner.create({
        ...data,
        logo: logoUrl,
    });

    return partner;
};

const getAllPartners = async (
    query: Record<string, unknown>,
    paginationOptions: TPaginationOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

    const filter: Record<string, unknown> = {};

    if (query.partnerType) filter.partnerType = query.partnerType;
    if (query.isActive !== undefined) filter.isActive = query.isActive === "true";
    if (query.search) {
        filter.name = new RegExp(query.search as string, "i");
    }

    const [partners, total] = await Promise.all([
        Partner.find(filter)
            .sort({ sortOrder: 1, [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit),
        Partner.countDocuments(filter),
    ]);

    return {
        data: partners,
        meta: { page, limit, total },
    };
};

const getActivePartners = async () => {
    const partners = await Partner.find({ isActive: true })
        .sort({ sortOrder: 1, createdAt: -1 });

    return partners;
};

const getPartnerById = async (id: string) => {
    const partner = await Partner.findById(id);
    if (!partner) {
        throw new AppError("Partner not found", 404);
    }
    return partner;
};

const updatePartner = async (id: string, data: UpdatePartnerInput, file?: Express.Multer.File) => {
    const partner = await Partner.findById(id);
    if (!partner) {
        throw new AppError("Partner not found", 404);
    }

    const updateData: Record<string, unknown> = { ...data };

    if (file) {
        const uploadResult = await uploadSingleImage(file);
        const newLogoUrl = uploadResult.secure_url || uploadResult.url;

        if (newLogoUrl) {
            // Delete old logo
            if (partner.logo) {
                const oldPublicId = extractPublicId(partner.logo);
                if (oldPublicId) {
                    try { await deleteImage(oldPublicId); } catch (e) { /* ignore */ }
                }
            }
            updateData.logo = newLogoUrl;
        }
    }

    const updatedPartner = await Partner.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return updatedPartner;
};

const deletePartner = async (id: string) => {
    const partner = await Partner.findById(id);
    if (!partner) {
        throw new AppError("Partner not found", 404);
    }

    partner.isDeleted = true;
    partner.isActive = false;
    await partner.save();

    return { message: "Partner deleted successfully" };
};

export const PartnerService = {
    createPartner,
    getAllPartners,
    getActivePartners,
    getPartnerById,
    updatePartner,
    deletePartner,
};
