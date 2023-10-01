import { Router } from "express";
import * as userController from "../controller/userController.js";
import { authRole } from "../middlewares/authRole.js";
import { limiter5 } from '../middlewares/rateLimiter.js';

const userRouter = Router();

userRouter.post('/login', limiter5, userController.loginUser);
userRouter.post('/', authRole("admin"), userController.createUser);
userRouter.get('/', authRole("admin"), userController.getUsers);
userRouter.get('/:id', authRole("admin"), userController.getUserId);
userRouter.patch('/:id', authRole("admin"), userController.updateUser);
userRouter.delete('/:id', authRole("admin"), userController.deleteUser);

export default userRouter