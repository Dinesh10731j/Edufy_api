import express from "express";
import { userSignUp,userLogIn} from "./user.controller";
const userRouter = express.Router();

userRouter.post("/user/signup", userSignUp);
userRouter.post("/user/login",userLogIn);

export default userRouter;
