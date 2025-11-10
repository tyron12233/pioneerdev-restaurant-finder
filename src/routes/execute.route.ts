import { Router } from "express";
import { validateCode } from "../middlewares/auth.middleware";
import { executeController } from "../controllers/execute.controller";

export const router: Router = Router();

router.get("/execute", validateCode, executeController);
