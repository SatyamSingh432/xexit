import express from "express";

import {
  registerUser,
  loginUser,
  verifyUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

router.get("/auth/verify", verifyUser);

export default router;
