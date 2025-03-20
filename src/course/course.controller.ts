import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Course from "./course.model";
import { AuthRequest } from "../utils/types";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import path from "path";
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
        createHttpError(500, error.message)
      );
    }

   next(createHttpError(500, "An unexpected error occurred"));
  }
};



export const uploadImage = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No image uploaded." });
    return;
  }

  const filePath = path.resolve(__dirname, "../../uploads", req.file.filename);


  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "course_images", 
      public_id: req.file.filename.split(".")[0],
    });

    fs.unlinkSync(filePath);

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    next(createHttpError(500, "Image upload failed"));
  }
};

