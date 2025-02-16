import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "./user.model";
import { Contact } from "./user.model";

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return next(createHttpError(400, "All fields are required"));
    }

    if (password !== confirmPassword) {
      return next(createHttpError(400, "Passwords do not match"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(createHttpError(400, "Invalid email format"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, "User with this email already exists"));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const hashedConfirmPassword = await bcrypt.hash(
      confirmPassword,
      saltRounds
    );
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    await newUser.save();

    const token = newUser.generateAuthToken();

    res.status(201).json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createHttpError(500, error.message));
    }
    return next(createHttpError(500, "An unexpected error occurred"));
  }
};

export const userLogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(createHttpError(400, "Invalid email format"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    const isPasswordMatched = await bcrypt.compare(password, user?.password);

    if (!isPasswordMatched) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token: token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createHttpError(500, error.message));
    }
    return next(createHttpError(500, "An unexpected error occurred"));
  }
};

export const userContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      description,
      email,
      phone,
      inquiryPurpose,
      organization,
      fullName,
      message,
    } = req.body;

    if (
      !description ||
      !email ||
      !phone ||
      !inquiryPurpose ||
      !organization ||
      !fullName ||
      !message
    ) {
      return next(createHttpError(400, "All fields are required"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(createHttpError(400, "Invalid email format"));
    }

    const isContactAlreadyExists = await Contact.findOne({ email });

    if (isContactAlreadyExists) {
      next(createHttpError(400, "User contact already exists"));
    }

    await Contact.create({
      fullName,
      email,
      description,
      phone,
      inquiryPurpose,
      organization,
      message,
    });

    res
      .status(201)
      .json({
        message:
          "Thank you for reaching out! Your inquiry has been submitted successfully. We will get back to you soon.",
        success: true,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(createHttpError(500, error.message));
    }

    next(createHttpError(500, "An unexpected error occurred"));
  }
};
