import express from "express";
import {
  startLiveStream,
  joinLiveStream,
  endLiveStream,
} from "./livestream.controller";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/start", authenticateUser, startLiveStream);
router.get("/join/:host",authenticateUser ,joinLiveStream);
router.post("/end",authenticateUser ,endLiveStream);

export default router;
