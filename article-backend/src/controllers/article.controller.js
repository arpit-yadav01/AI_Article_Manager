import Article from "../models/Article.js";

/**
 * CREATE ARTICLE
 */
export const createArticle = async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;

    const article = await Article.create({
      title,
      content,
      author: req.user.id,
      isPublished: isPublished ?? true, // default: public
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create article" });
  }
};

/**
 * GET ALL ARTICLES
 * - Guest → only public articles
 * - Logged-in user → public articles + own private articles
 */
export const getAllArticles = async (req, res) => {
  try {
    let filter = { isPublished: true };

    if (req.user) {
      filter = {
        $or: [
          { isPublished: true },
          { author: req.user._id },
        ],
      };
    }

    const articles = await Article.find(filter)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

/**
 * GET SINGLE ARTICLE
 * - Public → anyone
 * - Private → only owner or admin
 */
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // If article is private
    if (
      !article.isPublished &&
      (!req.user ||
        (article.author._id.toString() !== req.user.id &&
          req.user.role !== "admin"))
    ) {
      return res.status(403).json({ message: "Private article" });
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch article" });
  }
};

/**
 * UPDATE ARTICLE
 */
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Owner or admin
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.title = req.body.title ?? article.title;
    article.content = req.body.content ?? article.content;
    article.isPublished = req.body.isPublished ?? article.isPublished;

    await article.save();

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update article" });
  }
};

/**
 * DELETE ARTICLE
 */
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Owner or admin
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await article.deleteOne();

    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete article" });
  }
};
/**
 * GET MY ARTICLES
 * - Logged-in user → only their articles
 */
export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      author: req.user.id,
    })
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch my articles" });
  }
};