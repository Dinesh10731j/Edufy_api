import express,{Request,Response,NextFunction} from "express";
import { HttpError} from "http-errors";
import createHttpError from "http-errors";
import Configuration from "./src/config/config";
import connectDB from "./src/config/db";
const {Port,env} = Configuration
const app = express();
app.use((err:HttpError,req:Request,res:Response,next:NextFunction):any=>{
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({message:err.message,errorStack:env==='development' ? err.stack :''});

});



app.get("/",(req:Request,res:Response,next:NextFunction)=>{
const error = createHttpError(400,"Something went wrong");
throw error;
res.json({message:"Hello world I am server",statusCode:200})

});

app.listen(Port,async ()=>{
    await connectDB();
    console.log(`Listening to port ${Port}`);
})