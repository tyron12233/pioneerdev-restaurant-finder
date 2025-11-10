import { NextFunction, Request, RequestHandler, Response } from "express";
import { restaurantService } from "../services/restaurant.service";
import { geminiClient } from "../integrations/gemini.client";

export const executeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const message = req.query.message as string | undefined;

    if (!message || message.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Message query parameter is required",
      });
      return;
    }

    const response = await restaurantService.processMessage(message);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
