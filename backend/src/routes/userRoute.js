import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import { submitResignation } from "../controllers/userController.js";
const router = express.Router();

router.post("/user/resign", authenticateToken, submitResignation);

export default router;
