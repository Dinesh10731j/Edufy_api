import { Document } from "mongoose";
import { Request } from "express";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    confirmPassword:string,
    isLoggedIn:boolean,
    isActive:boolean,
    generateAuthToken: () => string;
  }

export interface ILivestream extends Document {
  hostId: string;
  streamKey: string;
  title: string;
  viewers: number;
  createdAt: Date;
  isLive:boolean;
}

export interface ContactFormInputs extends Document {
  inquiryPurpose: string;
  description: string;
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
}


export interface AuthRequest extends Request {
  id: string;
 
}