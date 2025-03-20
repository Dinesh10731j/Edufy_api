"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseBlocks = new mongoose_1.Schema({
    id: { type: String, required: true },
    type: {
        type: String,
        enum: ["header", "image", "paragraph", "list", "code", "table"],
        required: true,
    },
    data: {
        text: { type: String },
        level: { type: Number },
        caption: { type: String },
        file: {
            url: { type: String },
        },
        stretched: { type: Boolean, default: false },
        withBackground: { type: Boolean, default: false },
        withBorder: { type: Boolean, default: false },
        ParagraphText: { type: String },
        codeData: {
            code: { type: String },
        },
        items: {
            type: (Array),
            default: [],
        }
    },
}, { _id: false });
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    hashtags: { type: String, required: true, trim: true },
    blocks: [courseBlocks],
    courseInstructor: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
