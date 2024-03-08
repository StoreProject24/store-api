import express from 'express';
import { UserController } from './controller/user.controller';

export const userRouter = express.Router();

userRouter.use(UserController);
