import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginSchema),
    AuthController.login
);

router.post(
    '/logout',
    checkAuth(),
    AuthController.logout
);

router.post(
    '/change-password',
    checkAuth(),
    validateRequest(AuthValidation.changePasswordSchema),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    validateRequest(AuthValidation.forgotPasswordSchema),
    AuthController.forgotPassword
);

router.post(
    '/reset-password',
    validateRequest(AuthValidation.resetPasswordSchema),
    AuthController.resetPassword
);

router.post(
    '/refresh-token',
    AuthController.refreshToken
);

export const AuthRoutes = router;
