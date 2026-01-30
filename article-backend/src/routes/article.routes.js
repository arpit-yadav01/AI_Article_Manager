import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
} from "../controllers/article.controller.js";

import { protect, protectOptional } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 User specific (MUST COME FIRST)
router.get("/mine", protect, getMyArticles);

// 🌍 Public read
router.get("/", protectOptional, getAllArticles);
router.get("/:id", protectOptional, getArticleById);

// ✍️ Write actions
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

export default router;
