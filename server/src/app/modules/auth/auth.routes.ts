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

export const AuthRoutes = router;
