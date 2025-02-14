import doetenv from "dotenv";

doetenv.config();

const Configuration = {
  Port: process.env.PORT ?? 1080,
  Mongo_Url :process.env.MONGO_URL,
  env:process.env.NODE_ENV,
};

Object.freeze(Configuration);

export default Configuration;
