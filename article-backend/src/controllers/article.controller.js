import Article from "../models/Article.js";

/**
 * CREATE ARTICLE
 */
export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      author: req.user.id
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to create article" });
  }
};

/**
 * GET ALL ARTICLES (PUBLIC READ)
 */
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

/**
 * GET SINGLE ARTICLE
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

    res.json(article);
  } catch (error) {
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

    // Ownership OR admin check
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    await article.save();

    res.json(article);
  } catch (error) {
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

    // Ownership OR admin check
    if (
      article.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await article.deleteOne();

    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article" });
  }
};
