import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import livestreamModel from "./livestream.model";
import { AuthRequest } from "../utils/types";
export const startLiveStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, streamKey } = req.body;
    const _req = req as unknown as AuthRequest;
   
    
    // Basic validation
    if (!_req.id||!title || !streamKey) {
      return next(createHttpError(400, "Missing required fields: hostId, title, or streamKey"));
    }

    const existingLiveStream = await livestreamModel.findOne({ hostId: _req.id, isLive: true });
    if (existingLiveStream) {
      return next(createHttpError(400, "A livestream is already active."));
    }



    const newLiveStream = new livestreamModel({
      hostId:_req.id,
      streamKey,
      title,
      viewers: 0,
      isLive: true
    });
    await newLiveStream.save();
    res
      .status(201)
      .json({
        message: "Livestream started successfully!",
        liveStream: newLiveStream,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createHttpError(error.message));
    }
    next(createHttpError(500, "Failed to start livestream"));
  }
};
// Join a Livestream
export const joinLiveStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const _req = req as unknown as AuthRequest;

    if(!_req.id){
      return next(createHttpError(400,"HostId is missing"));
    }
    const liveStream = await livestreamModel.findOneAndUpdate(
      { hostId:_req.id, isLive: true },
      { $inc: { viewers: 1 } },
      { new: true }
    );
    if (!liveStream) {
      return next(createHttpError(404, "Livestream not found or not active"));
    }
    res.status(200).json({ message: "Joined livestream", liveStream });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createHttpError(500, error.message));
    }
    next(createHttpError(500, "Failed to join livestream"));
  }
};

// End a Livestream
export const endLiveStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const _req = req as unknown as AuthRequest;

    if(!_req.id){
      return next(createHttpError(400,"HostId is missing"));

    }
    const liveStream = await livestreamModel.findOneAndUpdate(
      { hostId:_req.id, isLive: true },
      { isLive: false, viewers: 0 },
      { new: true }
    );
    if (!liveStream) {
      return next(
        createHttpError(404, "Livestream not found or already ended")
      );
    }
    res.status(200).json({ message: "Livestream ended successfully!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createHttpError(error.message));
    }
    next(createHttpError(500, "Failed to end livestream"));
  }
};
