import express from "express";
import { userSignUp,userLogIn,userContact} from "./user.controller";
const userRouter = express.Router();

userRouter.post("/user/signup", userSignUp);
userRouter.post("/user/login",userLogIn);
userRouter.post("/user/contact",userContact);

export default userRouter;
