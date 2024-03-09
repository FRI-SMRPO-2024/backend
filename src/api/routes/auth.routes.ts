import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/change-password', AuthController.changePassword);

export default router;