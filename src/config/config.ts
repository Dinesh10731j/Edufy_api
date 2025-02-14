import doetenv from "dotenv";

doetenv.config();

const Configuration = {
  Port: process.env.PORT ?? 1080,
  Mongo_Url :process.env.MONGO_URL,
  env:process.env.NODE_ENV,
  Jwt_Secret:process.env.JWT_SECRET
};

Object.freeze(Configuration);

export default Configuration;
