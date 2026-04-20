import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { BannerController } from "./banner.controller";
import { BannerValidation } from "./banner.validation";
import { UserRole } from "../user/user.model";
import { uploadSingle } from "../../middlewares/upload";

const router = Router();

// Public routes
router.get("/active", BannerController.getActiveBanners);

// Admin routes
router.get(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    BannerController.getAllBanners
);
router.post(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(BannerValidation.createBannerSchema),
    BannerController.createBanner
);
router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(BannerValidation.updateBannerSchema),
    BannerController.updateBanner
);
router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    BannerController.deleteBanner
);

export const BannerRoutes = router;
