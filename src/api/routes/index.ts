import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import projectRouter from './project.routes';
import userProjectRouter from './user-project.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/user-project', userProjectRouter);

export default router;