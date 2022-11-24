import express from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.route("/signin").post(createUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
