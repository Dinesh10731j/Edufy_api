import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { createCourse,uploadImage } from "./course.controller";
import multer from "multer";
const courseRouter = express.Router();
const upload = multer({dest:'uploads/'})
courseRouter.post("/create",authenticateUser,createCourse);
courseRouter.post("/images/upload",upload.single('image'),uploadImage);

export default courseRouter;
