import mongoose, { Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
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
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      minlength:[8,"confirmPassword must be at least 8 characters long"]
    },

    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    isActive:{
      type:Boolean,
      default:false
    }
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

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
