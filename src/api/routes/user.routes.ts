import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/add', UserController.addUser);
router.get('/get/:id', UserController.getUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);


export default router;