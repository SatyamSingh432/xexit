import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  submitResignation,
  submitQuestionnaire,
  getResignationStatus,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/user/resign", authenticateToken, submitResignation);

router.post("/user/responses", authenticateToken, submitQuestionnaire);

router.get("/user/resignation_status", authenticateToken, getResignationStatus);

export default router;
