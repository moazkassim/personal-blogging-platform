import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
const userRouter = express.Router();
userRouter.post("/auth/register", validate(registerSchema), registerUser);
userRouter.post("/auth/login", validate(loginSchema), loginUser);

export default userRouter;
