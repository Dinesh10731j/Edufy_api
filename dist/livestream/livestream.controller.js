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
exports.endLiveStream = exports.joinLiveStream = exports.startLiveStream = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const livestream_model_1 = __importDefault(require("./livestream.model"));
const startLiveStream = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, streamKey } = req.body;
        const _req = req;
        // Basic validation
        if (!_req.id || !title || !streamKey) {
            return next((0, http_errors_1.default)(400, "Missing required fields: hostId, title, or streamKey"));
        }
        const existingLiveStream = yield livestream_model_1.default.findOne({ hostId: _req.id, isLive: true });
        if (existingLiveStream) {
            return next((0, http_errors_1.default)(400, "A livestream is already active."));
        }
        const newLiveStream = new livestream_model_1.default({
            hostId: _req.id,
            streamKey,
            title,
            viewers: 0,
            isLive: true
        });
        yield newLiveStream.save();
        res
            .status(201)
            .json({
            message: "Livestream started successfully!",
            liveStream: newLiveStream,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(error.message));
        }
        next((0, http_errors_1.default)(500, "Failed to start livestream"));
    }
});
exports.startLiveStream = startLiveStream;
// Join a Livestream
const joinLiveStream = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        if (!_req.id) {
            return next((0, http_errors_1.default)(400, "HostId is missing"));
        }
        const liveStream = yield livestream_model_1.default.findOneAndUpdate({ hostId: _req.id, isLive: true }, { $inc: { viewers: 1 } }, { new: true });
        if (!liveStream) {
            return next((0, http_errors_1.default)(404, "Livestream not found or not active"));
        }
        res.status(200).json({ message: "Joined livestream", liveStream });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(500, error.message));
        }
        next((0, http_errors_1.default)(500, "Failed to join livestream"));
    }
});
exports.joinLiveStream = joinLiveStream;
// End a Livestream
const endLiveStream = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _req = req;
        if (!_req.id) {
            return next((0, http_errors_1.default)(400, "HostId is missing"));
        }
        const liveStream = yield livestream_model_1.default.findOneAndUpdate({ hostId: _req.id, isLive: true }, { isLive: false, viewers: 0 }, { new: true });
        if (!liveStream) {
            return next((0, http_errors_1.default)(404, "Livestream not found or already ended"));
        }
        res.status(200).json({ message: "Livestream ended successfully!" });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, http_errors_1.default)(error.message));
        }
        next((0, http_errors_1.default)(500, "Failed to end livestream"));
    }
});
exports.endLiveStream = endLiveStream;
