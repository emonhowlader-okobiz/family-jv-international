import { AppError } from "../../errors/AppError";
import { Content } from "./content.model";
import type { UpsertContentInput } from "./content.validation";

const VALID_KEYS = [
    'about_us',
    'mission',
    'vision',
    'contact_info',
    'company_info',
    'terms_conditions',
    'privacy_policy',
    'why_choose_us',
    'our_services',
] as const;

const getAllContent = async () => {
    const contents = await Content.find({})
        .populate("updatedBy", "name email")
        .sort({ key: 1 });

    return contents;
};

const getPublishedContent = async () => {
    const contents = await Content.find({ isPublished: true })
        .select("-updatedBy")
        .sort({ key: 1 });

    return contents;
};

const getContentByKey = async (key: string) => {
    const content = await Content.findOne({ key })
        .populate("updatedBy", "name email");

    if (!content) {
        throw new AppError(`Content page "${key}" not found`, 404);
    }

    return content;
};

const upsertContent = async (key: string, data: UpsertContentInput, adminUserId: string) => {
    const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, '_');

    const content = await Content.findOneAndUpdate(
        { key: normalizedKey },
        {
            $set: {
                ...data,
                key: normalizedKey,
                updatedBy: adminUserId,
            },
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );

    return content;
};

const deleteContent = async (key: string) => {
    const content = await Content.findOneAndDelete({ key });

    if (!content) {
        throw new AppError(`Content page "${key}" not found`, 404);
    }

    return { message: `Content "${key}" deleted successfully` };
};

export const ContentService = {
    getAllContent,
    getPublishedContent,
    getContentByKey,
    upsertContent,
    deleteContent,
};
