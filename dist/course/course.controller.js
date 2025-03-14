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
exports.createCourse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const course_model_1 = __importDefault(require("./course.model"));
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const coursePrice = 200;
    const { title, hashtags, blocks } = req.body;
    try {
        const _req = req;
        if (!_req.id) {
            return next((0, http_errors_1.default)(400, "Instructor id is missing"));
        }
        const newCourse = new course_model_1.default({
            title,
            hashtags,
            courseInstructor: _req.id,
            coursePrice,
            blocks,
        });
        yield newCourse.save();
        res.status(201).json({ message: "Course created successfully", newCourse });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, error.message));
        }
        next((0, http_errors_1.default)(500, "An unexpected error occurred"));
    }
});
exports.createCourse = createCourse;
