import mongoose,{Schema,Model} from "mongoose";
import { ICourse } from "../utils/types";

const courseSchema = new Schema<ICourse>({
    title:{type:String,required:true},
    hashtags:[{type:String}],
    courseInstructor:{type:mongoose.Schema.ObjectId,required:true,ref:"User"},
    blocks:[{
        id:{type:String,required:true},
        type:{type:String,required:true},
        data:{
            text:{type:String,required:true}
        },
        version:{type:String,required:true},
        time:{type:Number,required:true}
    }]
});


export const Course : Model<ICourse> = mongoose.model<ICourse>("Course",courseSchema);
export default Course;