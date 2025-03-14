"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livestream_controller_1 = require("./livestream.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/start", authMiddleware_1.authenticateUser, livestream_controller_1.startLiveStream);
router.get("/join/:host", authMiddleware_1.authenticateUser, livestream_controller_1.joinLiveStream);
router.patch("/end", authMiddleware_1.authenticateUser, livestream_controller_1.endLiveStream);
exports.default = router;
