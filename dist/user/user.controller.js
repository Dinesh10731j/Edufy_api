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
exports.userContact = exports.userLogIn = exports.userSignUp = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const user_model_2 = require("./user.model");
const userSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword) {
            return next((0, http_errors_1.default)(400, "All fields are required"));
        }
        if (password !== confirmPassword) {
            return next((0, http_errors_1.default)(400, "Passwords do not match"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next((0, http_errors_1.default)(400, "Invalid email format"));
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            return next((0, http_errors_1.default)(409, "User with this email already exists"));
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const hashedConfirmPassword = yield bcrypt_1.default.hash(confirmPassword, saltRounds);
        const newUser = new user_model_1.User({
            name,
            email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
        });
        yield newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, error.message));
        }
        return next((0, http_errors_1.default)(500, "An unexpected error occurred"));
    }
});
exports.userSignUp = userSignUp;
const userLogIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next((0, http_errors_1.default)(400, "All fields are required"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next((0, http_errors_1.default)(400, "Invalid email format"));
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return next((0, http_errors_1.default)(404, "User not found"));
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordMatched) {
            return next((0, http_errors_1.default)(401, "Invalid Credentials"));
        }
        const token = user.generateAuthToken();
        res.status(200).json({ token: token });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, error.message));
        }
        return next((0, http_errors_1.default)(500, "An unexpected error occurred"));
    }
});
exports.userLogIn = userLogIn;
const userContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, email, phone, inquiryPurpose, organization, fullName, message, } = req.body;
        if (!description ||
            !email ||
            !phone ||
            !inquiryPurpose ||
            !organization ||
            !fullName ||
            !message) {
            return next((0, http_errors_1.default)(400, "All fields are required"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next((0, http_errors_1.default)(400, "Invalid email format"));
        }
        const isContactAlreadyExists = yield user_model_2.Contact.findOne({ email });
        if (isContactAlreadyExists) {
            next((0, http_errors_1.default)(400, "User contact already exists"));
        }
        yield user_model_2.Contact.create({
            fullName,
            email,
            description,
            phone,
            inquiryPurpose,
            organization,
            message,
        });
        res
            .status(201)
            .json({
            message: "Thank you for reaching out! Your inquiry has been submitted successfully. We will get back to you soon.",
            success: true,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next((0, http_errors_1.default)(500, error.message));
        }
        next((0, http_errors_1.default)(500, "An unexpected error occurred"));
    }
});
exports.userContact = userContact;
