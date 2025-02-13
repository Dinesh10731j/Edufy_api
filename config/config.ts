import doetenv from "dotenv";

doetenv.config();

const Configuration = {
  Port: process.env.PORT,
};

Object.freeze(Configuration);

export default Configuration;
