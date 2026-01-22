import express from "express";
import {
  loginAdmin,
  registerFirstAdmin
} from "../controllers/admin.auth.controller.js";

const router = express.Router();

// 🔐 One-time bootstrap admin registration
router.post("/register", registerFirstAdmin);

// 🔑 Admin login
router.post("/login", loginAdmin);

export default router;
