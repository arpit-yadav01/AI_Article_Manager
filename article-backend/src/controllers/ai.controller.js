import {
  summarizeText,
  rewriteText,
  findMistakesText,
  generateWritingIdeas,
} from "../services/ai.service.js";

/**
 * 🧠 AI SUMMARIZE (ADMIN ONLY)
 */
export const summarizeArticle = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only AI access" });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Article content required" });
    }

    const summary = await summarizeText(content);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI summarize failed" });
  }
};

/**
 * ✨ AI IMPROVE WRITING
 */
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

/**
 * 🔍 AI FIND MISTAKES
 */
export const checkMistakes = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const feedback = await findMistakesText(content);
    res.json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI mistake analysis failed" });
  }
};

/**
 * 💡 AI SUGGEST WRITING IDEAS (CORE FEATURE)
 */
export const suggestIdeasController = async (req, res) => {
  try {
    const { title = "", content } = req.body;

    if (!content || content.length < 30) {
      return res.status(400).json({
        message: "Please write a bit more before asking for suggestions",
      });
    }

    const suggestions = await generateWritingIdeas({
      title,
      content,
    });

    res.json({ suggestions });
  } catch (error) {
    console.error("AI Suggest Error:", error);
    res.status(500).json({ message: "AI suggestion failed" });
  }
};
