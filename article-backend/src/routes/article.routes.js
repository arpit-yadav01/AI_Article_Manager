import express from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../controllers/article.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public read
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Protected write
router.post("/", protect, createArticle);
router.put("/:id", protect, updateArticle);
router.delete("/:id", protect, deleteArticle);

export default router;
