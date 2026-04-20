import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { PartnerController } from "./partner.controller";
import { PartnerValidation } from "./partner.validation";
import { UserRole } from "../user/user.model";
import { uploadSingle } from "../../middlewares/upload";

const router = Router();

// Public routes
router.get("/active", PartnerController.getActivePartners);

// Admin routes
router.get(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    PartnerController.getAllPartners
);
router.get(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    PartnerController.getPartnerById
);
router.post(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(PartnerValidation.createPartnerSchema),
    PartnerController.createPartner
);
router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(PartnerValidation.updatePartnerSchema),
    PartnerController.updatePartner
);
router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    PartnerController.deletePartner
);

export const PartnerRoutes = router;
