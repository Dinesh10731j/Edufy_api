import express from "express";
import { userSignUp } from "./user.controller";
const userRouter = express.Router();

userRouter.post("/user/signup", userSignUp);

export default userRouter;
