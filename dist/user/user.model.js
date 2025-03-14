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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const { Jwt_Secret } = config_1.default;
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    confirmPassword: {
        type: String,
        required: [true, "confirmPassword is required"],
        minlength: [8, "confirmPassword must be at least 8 characters long"],
        select: false,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
UserSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id }, Jwt_Secret, {
        expiresIn: "1h",
    });
    return token;
};
exports.User = mongoose_1.default.model("User", UserSchema);
const UserContactSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [10, "Message  must be at least 10 characters long"],
    },
    organization: {
        type: String,
        required: [true, "Organization is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    inquiryPurpose: {
        type: String,
        required: [true, "InquiryPurpose is required"],
    },
});
exports.Contact = mongoose_1.default.model("Contact", UserContactSchema);
