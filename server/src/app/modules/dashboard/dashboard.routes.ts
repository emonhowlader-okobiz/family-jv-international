import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { DashboardController } from "./dashboard.controller";
import { UserRole } from "../user/user.model";

const router = Router();

router.get(
    "/stats",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    DashboardController.getDashboardStats
);

export const DashboardRoutes = router;
