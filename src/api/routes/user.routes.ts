import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/get-user', UserController.getUser);
router.post('/update-user', UserController.updateUser);
router.post('/update-last-login', UserController.updateLastLogin);


export default router;