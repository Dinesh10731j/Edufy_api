import { Document,Schema} from "mongoose";
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



export interface ICourse extends Document {
  title: string;
  hashtags: string;
  courseInstructor:{type:Schema.Types.ObjectId,ref:"User"},
  blocks: Array<{
    id: string;
    type: string;
    data: {
      text: string;
    };
    version: string; 
    time: number; 
  }>;
}