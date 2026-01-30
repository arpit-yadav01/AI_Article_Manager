// import {
//   summarizeText,
//   rewriteText,
//   findMistakesText,
//   generateWritingIdeas,
// } from "../services/ai.service.js";

// /**
//  * 🧠 AI SUMMARIZE (ADMIN ONLY)
//  */
// /**
//  * 🧠 AI SUMMARIZE (ANY LOGGED-IN USER)
//  */
// export const summarizeArticle = async (req, res) => {
//   try {
//     const { content } = req.body;

//     if (!content) {
//       return res.status(400).json({ message: "Article content required" });
//     }

//     const summary = await summarizeText(content);
//     res.json({ summary });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "AI summarize failed" });
//   }
// };


// /**
//  * ✨ AI IMPROVE WRITING
//  */
// export const improveWriting = async (req, res) => {
//   try {
//     const { content } = req.body;

//     if (!content) {
//       return res.status(400).json({ message: "Content is required" });
//     }

//     const improved = await rewriteText(content);
//     res.json({ improved });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "AI rewrite failed" });
//   }
// };

// /**
//  * 🔍 AI FIND MISTAKES
//  */
// export const checkMistakes = async (req, res) => {
//   try {
//     const { content } = req.body;

//     if (!content) {
//       return res.status(400).json({ message: "Content is required" });
//     }

//     const feedback = await findMistakesText(content);
//     res.json({ feedback });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "AI mistake analysis failed" });
//   }
// };

// /**
//  * 💡 AI SUGGEST WRITING IDEAS (CORE FEATURE)
//  */
// export const suggestIdeasController = async (req, res) => {
//   try {
//     const { title = "", content } = req.body;

//     if (!content || content.length < 30) {
//       return res.status(400).json({
//         message: "Please write a bit more before asking for suggestions",
//       });
//     }

//     const suggestions = await generateWritingIdeas({
//       title,
//       content,
//     });

//     res.json({ suggestions });
//   } catch (error) {
//     console.error("AI Suggest Error:", error);
//     res.status(500).json({ message: "AI suggestion failed" });
//   }
// };



import User from "../models/User.js";
import {
  summarizeText,
  rewriteText,
  findMistakesText,
  generateWritingIdeas,
} from "../services/ai.service.js";

const AI_LIMIT = 20;
const RESET_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours

/**
 * 🔒 AI QUOTA CHECK
 * - Admin → unlimited
 * - User → 20 per 6 hours
 */
const checkAndConsumeAIQuota = async (user) => {
  // 👑 ADMIN = UNLIMITED
  if (user.role === "admin") {
    return { remaining: "unlimited" };
  }

  const now = new Date();

  if (!user.aiUsageResetAt || now > user.aiUsageResetAt) {
    user.aiUsageCount = 0;
    user.aiUsageResetAt = new Date(now.getTime() + RESET_INTERVAL_MS);
  }

  if (user.aiUsageCount >= AI_LIMIT) {
    throw new Error("AI_LIMIT_REACHED");
  }

  user.aiUsageCount += 1;
  await user.save();

  return {
    remaining: AI_LIMIT - user.aiUsageCount,
  };
};

/**
 * 🧠 AI SUMMARIZE
 */
export const summarizeArticle = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Article content required" });
    }

    const quota = await checkAndConsumeAIQuota(req.user);
    const summary = await summarizeText(content);

    res.json({
      result: summary,
      remaining: quota.remaining,
    });
  } catch (error) {
    if (error.message === "AI_LIMIT_REACHED") {
      return res.status(429).json({
        message: "AI usage limit reached. Please wait 6 hours for reset.",
      });
    }

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

    const quota = await checkAndConsumeAIQuota(req.user);
    const improved = await rewriteText(content);

    res.json({
      result: improved,
      remaining: quota.remaining,
    });
  } catch (error) {
    if (error.message === "AI_LIMIT_REACHED") {
      return res.status(429).json({
        message: "AI usage limit reached. Please wait 6 hours for reset.",
      });
    }

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

    const quota = await checkAndConsumeAIQuota(req.user);
    const feedback = await findMistakesText(content);

    res.json({
      result: feedback,
      remaining: quota.remaining,
    });
  } catch (error) {
    if (error.message === "AI_LIMIT_REACHED") {
      return res.status(429).json({
        message: "AI usage limit reached. Please wait 6 hours for reset.",
      });
    }

    console.error(error);
    res.status(500).json({ message: "AI mistake analysis failed" });
  }
};

/**
 * 💡 AI SUGGEST IDEAS
 */
export const suggestIdeasController = async (req, res) => {
  try {
    const { title = "", content } = req.body;

    if (!content || content.length < 30) {
      return res.status(400).json({
        message: "Please write a bit more before asking for suggestions",
      });
    }

    const quota = await checkAndConsumeAIQuota(req.user);
    const suggestions = await generateWritingIdeas({ title, content });

    res.json({
      suggestions,
      remaining: quota.remaining,
    });
  } catch (error) {
    if (error.message === "AI_LIMIT_REACHED") {
      return res.status(429).json({
        message: "AI usage limit reached. Please wait 6 hours for reset.",
      });
    }

    console.error(error);
    res.status(500).json({ message: "AI suggestion failed" });
  }
};
