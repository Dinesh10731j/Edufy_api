import mongoose,{Schema} from "mongoose";


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

interface ICourseBlock {
    id: string;
    type: "header" | "image" | "paragraph" | "list" | "code" | "table";
    data: ICourseBlockData;
    
}

const courseBlocks = new Schema<ICourseBlock>({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ["header", "image", "paragraph", "list", "code","table"],
        required: true,
    },
    data: {
        text: { type: String },
        level: { type: Number },
        caption: { type: String },
        file: {
            url: { type: String },
        },
        stretched: { type: Boolean, default: false },
        withBackground: { type: Boolean, default: false },
        withBorder: { type: Boolean, default: false },
        ParagraphText: { type: String },
        codeData: {
            code: { type: String },
        },
      
        items: {
            type: Array<string>,
            default: [],
        }
    },
}, { _id: false });
  



const courseSchema = new Schema({
    title: { type: String, required: true, trim: true },
    hashtags: { type:String, required: true, trim: true },
    blocks:[courseBlocks],
    courseInstructor:{type:Schema.Types.ObjectId,ref:"User"},

},{timestamps:true})




const Course  = mongoose.model("Course",courseSchema);


export default Course;
