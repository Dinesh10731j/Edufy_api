import mongoose,{Schema} from "mongoose";
import { ILivestream } from "../utils/types";

const LivestreamSchema = new Schema<ILivestream>({
    hostId: { type: String, required: true },
    streamKey: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    viewers: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    isLive:{type:Boolean,default:false},
  });
  
  export default mongoose.model<ILivestream>("Livestream", LivestreamSchema);