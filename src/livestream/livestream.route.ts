import express from "express";
import { startLiveStream, joinLiveStream, endLiveStream } from "./livestream.controller";

const router = express.Router();

router.post("/start", startLiveStream);
router.get("/join/:host", joinLiveStream);
router.post("/end", endLiveStream);

export default router;
