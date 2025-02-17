import express from "express";
import { userSignUp,userLogIn,userContact} from "./user.controller";
const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login",userLogIn);
userRouter.post("/contact",userContact);

export default userRouter;
