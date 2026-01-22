import { summarizeText } from "../services/ai.service.js";
import { rewriteText } from "../services/ai.service.js";

import { findMistakes } from "../services/ai.service.js";
import { suggestIdeas } from "../services/ai.service.js";
export const summarizeArticle = async (req, res) => {
  try {
    // 🔐 Backend role protection
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only AI access" });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Article content required" });
    }

    const summary = await summarizeText(content);

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "AI summarize failed" });
  }
};



export const improveWriting = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const improved = await rewriteText(content);

    res.json({ improved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI rewrite failed" });
  }
};




export const checkMistakes = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const feedback = await findMistakes(content);

    res.json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI mistake analysis failed" });
  }
};



export const suggestWritingIdeas = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content || content.length < 30) {
      return res.status(400).json({
        message: "Please write a bit more before asking for suggestions",
      });
    }

    const suggestions = await suggestIdeas(title || "", content);

    res.json({ suggestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "AI suggestion failed",
    });
  }
};
