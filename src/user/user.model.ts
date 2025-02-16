import mongoose, { Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser, ContactFormInputs } from "../utils/types";
import Configuration from "../config/config";
const { Jwt_Secret } = Configuration;

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    confirmPassword: {
      type: String,
      required: [true, "confirmPassword is required"],
      minlength: [8, "confirmPassword must be at least 8 characters long"],
      select: false,
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ id: this._id }, Jwt_Secret as string, {
    expiresIn: "1h",
  });
  return token;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);


const UserContactSchema: Schema<ContactFormInputs> = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [10, "Message  must be at least 10 characters long"],
  },
  organization: {
    type: String,
    required: [true, "Organization is required"],
  },

  phone: {
    type: String,
    required: [true, "Phone is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  inquiryPurpose: {
    type: String,
    required: [true, "InquiryPurpose is required"],
  },
});

export const Contact: Model<ContactFormInputs> = mongoose.model<ContactFormInputs>(
  "Contact",
  UserContactSchema
);


