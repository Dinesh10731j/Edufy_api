"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const db_1 = __importDefault(require("./config/db"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const user_route_1 = __importDefault(require("./user/user.route"));
const livestream_route_1 = __importDefault(require("./livestream/livestream.route"));
const course_route_1 = __importDefault(require("./course/course.route"));
const { Port } = config_1.default;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(globalErrorHandler_1.default);
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://eduufy.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
}));
// API Routes
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/livestream", livestream_route_1.default);
app.use("/api/v1/course", course_route_1.default);
// WebSocket Setup
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://eduufy.netlify.app"],
    },
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("joinLive", (host) => {
        var _a;
        socket.join(host);
        io.to(host).emit("viewerCount", {
            viewers: ((_a = io.sockets.adapter.rooms.get(host)) === null || _a === void 0 ? void 0 : _a.size) || 0,
        });
    });
    socket.on("send-message", ({ user, message }) => {
        io.to(user).emit("receive-message", message);
    });
    socket.on("leaveLive", (host) => {
        var _a;
        socket.leave(host);
        io.to(host).emit("viewerCount", {
            viewers: ((_a = io.sockets.adapter.rooms.get(host)) === null || _a === void 0 ? void 0 : _a.size) || 0,
        });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
    socket.on("start-stream", (data) => {
        socket.broadcast.emit("start-stream", data);
    });
});
server.listen(Port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        console.log(`Listening on port ${Port}`);
    }
    catch (error) {
        console.error("Failed to connect to database", error);
        process.exit(1);
    }
}));
