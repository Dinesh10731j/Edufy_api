"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const course_controller_1 = require("./course.controller");
const multer_1 = __importDefault(require("multer"));
const courseRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
}).single('image');
courseRouter.post("/images/upload", upload, course_controller_1.uploadImage);
courseRouter.post("/create", authMiddleware_1.authenticateUser, course_controller_1.createCourse);
courseRouter.post("/images/upload", upload, course_controller_1.uploadImage);
exports.default = courseRouter;
