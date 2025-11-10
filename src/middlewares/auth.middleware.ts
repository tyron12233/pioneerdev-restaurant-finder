import { RequestHandler } from "express";

export const validateCode: RequestHandler = (req, res, next) => {
    const code = req.query.code as string | undefined;

    if (!code) {
        res.status(400).json({
            message: 'Code query parameter is required'
        });
        return;
    }

    const codeSecret = process.env.CODE_SECRET
    if (code !== codeSecret) {
        res.status(403).json({
            message: 'Invalid code'
        });
        return;
    }

    next();
};