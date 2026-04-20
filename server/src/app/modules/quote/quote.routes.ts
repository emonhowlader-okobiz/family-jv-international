import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { QuoteController } from "./quote.controller";
import { QuoteValidation } from "./quote.validation";
import { UserRole } from "../user/user.model";
import { quoteLimiter } from "../../middlewares/quoteLimiter";

const router = Router();

// Public route (rate-limited)
router.post(
    "/",
    quoteLimiter,
    validateRequest(QuoteValidation.createQuoteSchema),
    QuoteController.createQuote
);

// Admin routes
router.get(
    "/stats",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    QuoteController.getQuoteStats
);
router.get(
    "/",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    QuoteController.getAllQuotes
);
router.get(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    QuoteController.getQuoteById
);
router.patch(
    "/:id/respond",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(QuoteValidation.respondToQuoteSchema),
    QuoteController.respondToQuote
);
router.patch(
    "/:id/status",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(QuoteValidation.updateQuoteStatusSchema),
    QuoteController.updateQuoteStatus
);
router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    QuoteController.deleteQuote
);

export const QuoteRoutes = router;
