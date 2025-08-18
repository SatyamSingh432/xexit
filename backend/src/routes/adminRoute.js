import express from "express";

import { authenticateToken, isAdmin } from "../middlewares/authMiddleware.js";

import { getResignations } from "../controllers/adminController.js";

const router = express.Router();

router.get("/admin/resignations", authenticateToken, isAdmin, getResignations);

export default router;
