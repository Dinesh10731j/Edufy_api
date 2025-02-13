import doetenv from "dotenv";

doetenv.config();

const Configuration = {
  Port: process.env.PORT ?? 1080,
};

Object.freeze(Configuration);

export default Configuration;
