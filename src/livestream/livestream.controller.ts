import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import LiveStream from "./livestream.model";

// Start a Livestream
export const startLiveStream = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { host } = req.body;
    console.log("Received host in request body:", req.body);
    const existingLiveStream = await LiveStream.findOne({ host, isLive: true });
    if (existingLiveStream) {
      return next(createHttpError(400, "A livestream is already active."));
    }

    const newLiveStream = new LiveStream({ host, isLive: true, viewers: 0 });
    await newLiveStream.save();

    res.status(201).json({ message: "Livestream started successfully!", liveStream: newLiveStream });
  } catch (error:unknown) {

    if(error instanceof Error){
        next(createHttpError(500, "Failed to start livestream"));
    }

    next(createHttpError(500,"Something went wrong,An unknown error occured!"));
    
  }
};

// Join a Livestream
export const joinLiveStream = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { host } = req.params;
   


    const liveStream = await LiveStream.findOne({ host, isLive: true });
    if (!liveStream) {
      return next(createHttpError(404, "Livestream not found or not active"));
    }

    liveStream.viewers += 1;
    await liveStream.save();

    res.status(200).json({ message: "Joined livestream", liveStream });
  } catch (error:unknown) {

    if(error instanceof Error){
        next(createHttpError(500, "Failed to join livestream"));
    }
    next(createHttpError(500, "Something went wrong,Anu unknown error occured!"));

   
  }
};

// End a Livestream
export const endLiveStream = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { host } = req.body;

    const liveStream = await LiveStream.findOne({ host, isLive: true });
    if (!liveStream) {
      return next(createHttpError(404, "Livestream not found or already ended"));
    }

    liveStream.isLive = false;
    liveStream.viewers = 0;
    await liveStream.save();

    res.status(200).json({ message: "Livestream ended successfully!" });
  } catch (error:unknown) {
    if(error instanceof Error){
        next(createHttpError(500, "Failed to end livestream"));
    }
    next(createHttpError(500, "Something went wrong,Anu unknown error occured!"));

  }
};
