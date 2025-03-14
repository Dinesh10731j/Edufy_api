"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Configuration = {
    Port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1080,
    Mongo_Url: process.env.MONGO_URL,
    env: process.env.NODE_ENV,
    Jwt_Secret: process.env.JWT_SECRET
};
Object.freeze(Configuration);
exports.default = Configuration;
