"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const course_controller_1 = require("./course.controller");
const courseRouter = express_1.default.Router();
courseRouter.post("/create", authMiddleware_1.authenticateUser, course_controller_1.createCourse);
exports.default = courseRouter;
