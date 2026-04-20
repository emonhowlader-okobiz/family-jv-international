import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { ContentController } from "./content.controller";
import { ContentValidation } from "./content.validation";
import { UserRole } from "../user/user.model";

const router = Router();

// Public routes
router.get("/published", ContentController.getPublishedContent);
router.get("/:key", ContentController.getContentByKey);

// Admin routes
router.get(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ContentController.getAllContent
);
router.put(
    "/:key",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(ContentValidation.upsertContentSchema),
    ContentController.upsertContent
);
router.delete(
    "/:key",
    checkAuth(UserRole.SUPER_ADMIN),
    ContentController.deleteContent
);

export const ContentRoutes = router;
