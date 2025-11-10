import { NextFunction, Request, RequestHandler, Response } from "express";

export const executeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({ message: "Execute endpoint hit" });
  } catch (error) {
    next(error);
  }
};
