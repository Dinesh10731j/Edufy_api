import express from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { createCourse } from "./course.controller";
const courseRouter = express.Router();

courseRouter.post("/create",authenticateUser,createCourse);

export default courseRouter;
