import express from "express";

import { authenticateToken, isAdmin } from "../middlewares/authMiddleware.js";

import {
  getResignations,
  concludeResignation,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/admin/resignations", authenticateToken, isAdmin, getResignations);
router.put(
  "/admin/conclude_resignation",
  authenticateToken,
  isAdmin,
  concludeResignation
);
export default router;
