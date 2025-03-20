import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Configuration from "./config/config";
import connectDB from "./config/db";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/user.route";
import liveStreamRouter from "./livestream/livestream.route";
import courseRouter from "./course/course.route";
const { Port } = Configuration;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(globalErrorHandler);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://eduufy.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/livestream", liveStreamRouter);
app.use("/api/v1/course", courseRouter);
courseRouter.use(express.json({ limit: '10mb' }));  
courseRouter.use(express.urlencoded({ extended: true, limit: '10mb' }));

// WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://eduufy.netlify.app"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinLive", (host) => {
    socket.join(host);
    io.to(host).emit("viewerCount", {
      viewers: io.sockets.adapter.rooms.get(host)?.size || 0,
    });
  });

  socket.on("send-message", ({ user, message }) => {
    io.to(user).emit("receive-message", message);   
  });

  socket.on("leaveLive", (host) => {
    socket.leave(host);
    io.to(host).emit("viewerCount", {
      viewers: io.sockets.adapter.rooms.get(host)?.size || 0,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("start-stream", (data) => {
    socket.broadcast.emit("start-stream", data);
  });
});

server.listen(Port, async () => {
  try {
    await connectDB();
    console.log(`Listening on port ${Port}`);
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
});
