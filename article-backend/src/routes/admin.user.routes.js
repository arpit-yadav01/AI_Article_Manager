import express from "express";
import { makeAdmin, removeAdmin } from "../controllers/admin.user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// 👮 Admin role management
router.put("/make-admin/:userId", protect, isAdmin, makeAdmin);
router.put("/remove-admin/:userId", protect, isAdmin, removeAdmin);

export default router;
