import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  summarizeArticle,
  improveWriting,
  checkMistakes,
  suggestIdeasController,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/summarize", protect, summarizeArticle);
router.post("/rewrite", protect, improveWriting);
router.post("/mistakes", protect, checkMistakes);
router.post("/suggest", protect, suggestIdeasController);

export default router;
