import { Product } from "../product/product.model";
import { Category } from "../category/category.model";
import { Quote, QuoteStatus } from "../quote/quote.model";
import { Banner } from "../banner/banner.model";
import { Partner } from "../partner/partner.model";
import { User } from "../user/user.model";

const getDashboardStats = async () => {
    const [
        totalProducts,
        exportProducts,
        importProducts,
        totalCategories,
        exportCategories,
        importCategories,
        totalQuotes,
        pendingQuotes,
        reviewedQuotes,
        respondedQuotes,
        closedQuotes,
        totalBanners,
        activeBanners,
        totalPartners,
        activePartners,
        totalUsers,
        recentQuotes,
        recentProducts,
    ] = await Promise.all([
        // Products
        Product.countDocuments({}),
        Product.countDocuments({ type: "EXPORT" }),
        Product.countDocuments({ type: "IMPORT" }),

        // Categories
        Category.countDocuments({}),
        Category.countDocuments({ type: "EXPORT" }),
        Category.countDocuments({ type: "IMPORT" }),

        // Quotes
        Quote.countDocuments({}),
        Quote.countDocuments({ status: QuoteStatus.PENDING }),
        Quote.countDocuments({ status: QuoteStatus.REVIEWED }),
        Quote.countDocuments({ status: QuoteStatus.RESPONDED }),
        Quote.countDocuments({ status: QuoteStatus.CLOSED }),

        // Banners
        Banner.countDocuments({}),
        Banner.countDocuments({ isActive: true }),

        // Partners
        Partner.countDocuments({}),
        Partner.countDocuments({ isActive: true }),

        // Users
        User.countDocuments({}),

        // Recent data
        Quote.find({})
            .select("quoteNumber name email productType status createdAt")
            .sort({ createdAt: -1 })
            .limit(10),

        Product.find({})
            .select("name slug type thumbnail isAvailable createdAt")
            .populate("category", "name")
            .sort({ createdAt: -1 })
            .limit(5),
    ]);

    return {
        products: {
            total: totalProducts,
            export: exportProducts,
            import: importProducts,
        },
        categories: {
            total: totalCategories,
            export: exportCategories,
            import: importCategories,
        },
        quotes: {
            total: totalQuotes,
            byStatus: {
                pending: pendingQuotes,
                reviewed: reviewedQuotes,
                responded: respondedQuotes,
                closed: closedQuotes,
            },
        },
        banners: {
            total: totalBanners,
            active: activeBanners,
        },
        partners: {
            total: totalPartners,
            active: activePartners,
        },
        users: {
            total: totalUsers,
        },
        recent: {
            quotes: recentQuotes,
            products: recentProducts,
        },
    };
};

export const DashboardService = {
    getDashboardStats,
};
