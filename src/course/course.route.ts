import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { createCourse,uploadImage } from "./course.controller";
import multer from "multer";
const courseRouter = express.Router();
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, 
    },
  }).single('image'); 
  courseRouter.post("/images/upload", upload, uploadImage);
courseRouter.post("/create",authenticateUser,createCourse);
courseRouter.post("/images/upload",upload,uploadImage);

export default courseRouter;
