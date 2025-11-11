import { RequestHandler } from "express";
import { config } from "../utils/config";

export const validateCode: RequestHandler = (req, res, next) => {
  const code = req.query.code as string | undefined;

  if (!code) {
    res.status(400).json({
      message: "Code query parameter is required",
    });
    return;
  }

  const codeSecret = config.CODE_SECRET;
  if (code !== codeSecret) {
    res.status(401).json({
      message: "Unauthorized: Invalid code.",
    });
    return;
  }

  next();
};
