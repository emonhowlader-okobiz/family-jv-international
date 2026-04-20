import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "./user.model";

const router = Router();

// Self-profile routes (any authenticated user)
router.get("/me", checkAuth(), UserController.getMe);
router.patch(
    "/me",
    checkAuth(),
    validateRequest(UserValidation.updateProfileSchema),
    UserController.updateProfile
);

// Admin management routes (SUPER_ADMIN only)
router.get("/", checkAuth(UserRole.SUPER_ADMIN), UserController.getAllUsers);
router.post(
    "/",
    checkAuth(UserRole.SUPER_ADMIN),
    validateRequest(UserValidation.createUserSchema),
    UserController.createUser
);
router.get("/:id", checkAuth(UserRole.SUPER_ADMIN), UserController.getUserById);
router.patch(
    "/:id/status",
    checkAuth(UserRole.SUPER_ADMIN),
    validateRequest(UserValidation.updateStatusSchema),
    UserController.updateUserStatus
);
router.delete("/:id", checkAuth(UserRole.SUPER_ADMIN), UserController.deleteUser);

export const UserRoutes = router;
