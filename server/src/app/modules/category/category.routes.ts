import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import { UserRole } from "../user/user.model";
import { uploadSingle } from "../../middlewares/upload";

const router = Router();

// Public routes
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

// Admin routes
router.post(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(CategoryValidation.createCategorySchema),
    CategoryController.createCategory
);
router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadSingle,
    validateRequest(CategoryValidation.updateCategorySchema),
    CategoryController.updateCategory
);
router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    CategoryController.deleteCategory
);

export const CategoryRoutes = router;
