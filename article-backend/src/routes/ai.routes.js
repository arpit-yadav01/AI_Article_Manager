import express from "express";
import { summarizeArticle, improveWriting } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import { checkMistakes } from "../controllers/ai.controller.js";

const router = express.Router();

// 🧠 AI Summarize (Admin only)
router.post("/summarize", protect, isAdmin, summarizeArticle);

// ✨ AI Improve Writing (Admin only)
router.post("/rewrite", protect, isAdmin, improveWriting);
router.post("/mistakes", protect, isAdmin, checkMistakes);

export default router;
