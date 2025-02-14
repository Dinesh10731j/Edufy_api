import express from "express";
import cors from "cors";
import Configuration from "./src/config/config";
import connectDB from "./src/config/db";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import userRouter from "./src/user/user.route";

const { Port } = Configuration;
const app = express();
app.use(express.json());
app.use(globalErrorHandler);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://eduufy.netlify.app/"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH" ,"OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400,
    exposedHeaders: ["Content-Length", "X-Kuma-Revision"],
  })
);
app.use("/api/v1", userRouter);

app.listen(Port, async () => {
  try {
    await connectDB();
    console.log(`Listening on port ${Port}`);
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
});
