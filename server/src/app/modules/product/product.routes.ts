import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import { UserRole } from "../user/user.model";
import { uploadMultiple } from "../../middlewares/upload";

const router = Router();

// Public routes
router.get("/featured", ProductController.getFeaturedProducts);
router.get("/", ProductController.getAllProducts);
router.get("/:idOrSlug", ProductController.getProductById);

// Admin routes
router.post(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadMultiple,
    validateRequest(ProductValidation.createProductSchema),
    ProductController.createProduct
);
router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    uploadMultiple,
    validateRequest(ProductValidation.updateProductSchema),
    ProductController.updateProduct
);
router.patch(
    "/:id/remove-image",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ProductController.removeProductImage
);
router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ProductController.deleteProduct
);

export const ProductRoutes = router;
