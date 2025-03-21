import mongoose,{Schema} from "mongoose";
import { ICourseBlock } from "../utils/types";

const courseBlocks = new Schema<ICourseBlock>({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ["header", "image", "paragraph", "list", "code","table" ,"checklist","warning","quote","raw"],
        required: true,
    },
    data: {
        text: { type: String },
        level: { type: Number },
        caption: { type: String },
        alignment: { type: String },
        file: {
            url:{
                imageUrl:{type:String}
            },
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
        },

        content:{
            type:[[String]]
        },
        title:{
            type:String
        },
        message:{
            type:String
        },
        html:{
            type:String
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
