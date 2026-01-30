import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function CreateArticle() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true); // 🌍 default public
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleCreate = async () => {
    // 🔒 EXTRA UX GUARD (CLIENT SIDE)
    if (!user) {
      alert("🔒 Please login first to post an article");
      navigate("/login", {
        state: {
          from: { pathname: "/create" },
          message: "🔒 Please login first to post an article",
        },
      });
      return;
    }

    if (!title || !content) {
      setMsg("Title and content are required ❌");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      await api.post("/articles", {
        title,
        content,
        isPublished,
      });

      setMsg("Article posted successfully ✅");
      setTitle("");
      setContent("");
      setIsPublished(true);
    } catch (err) {
      setMsg("Failed to post article & go login first ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground variant="default" />

      <div className="create-article-page">
        <h2>Write a New Article</h2>

        {/* 📝 TITLE */}
        <input
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 📝 CONTENT */}
        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />

        {/* 🌍🔒 VISIBILITY */}
        <div className="visibility-toggle">
          <p>Article Visibility</p>

          <div className="visibility-buttons">
            <button
              type="button"
              className={isPublished ? "active" : ""}
              onClick={() => setIsPublished(true)}
            >
              🌍 Public
            </button>

            <button
              type="button"
              className={!isPublished ? "active" : ""}
              onClick={() => setIsPublished(false)}
            >
              🔒 Private
            </button>
          </div>
        </div>

        {/* 🚀 SUBMIT */}
        <button onClick={handleCreate} disabled={loading}>
          {loading ? "Posting..." : "Post Article"}
        </button>

        {msg && <p className="form-message">{msg}</p>}
      </div>
    </>
  );
}
