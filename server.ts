import express,{Request,Response} from "express";
import Configuration from "./config/config";
const {Port} = Configuration
const app = express();


app.get("/",(req:Request,res:Response)=>{
res.json({message:"Hellow world I am server",statusCode:200});

});

app.listen(Port,()=>{
    console.log(`Listening to port ${Port}`);
})