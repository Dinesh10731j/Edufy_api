import { Document} from "mongoose";
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



interface ICourseBlockData {
    text?: string;
    level?: number;
    caption?: string;
    file?: {
        url: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    ParagraphText?: string;
    codeData?: {
        code: string;
    };
    style?: "unordered" | "ordered";
    items?: string[];
}

export interface ICourseBlock {
    id: string;
    type: "header" | "image" | "paragraph" | "list" | "code" | "table" | "checklist" | "warning" | "quote" | "raw";
    data: ICourseBlockData;
    
}