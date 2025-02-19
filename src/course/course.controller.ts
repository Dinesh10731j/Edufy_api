import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Course from "./course.model";
import { AuthRequest } from "../utils/types";
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coursePrice = 200;
  const { title, hashtags, blocks } = req.body;
  try {
    const _req = req as unknown as AuthRequest;

if(!_req.id){
  return next(createHttpError(400, "Instructor id is missing"));
}


    const newCourse = new Course({
      title,
      hashtags,
      courseInstructor: _req.id,
      coursePrice,
      blocks,
    });
    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", newCourse });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(
        createHttpError(500, "An error occurred while creating course")
      );
    }

    next(createHttpError(500, "An error occurred while creating course"));
  }
};
