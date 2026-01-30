import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  // 🧠 AI states
  const [showAI, setShowAI] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");

  // 🔁 Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 🚀 POST ARTICLE
  const handlePost = async () => {
    // 🔒 UX GUARD
    if (!user) {
      setMsg("🔒 Please login first to post an article");
      navigate("/login", {
        state: {
          from: { pathname: "/" },
          message: "🔒 Please login first to post an article",
        },
      });
      return;
    }

    if (!title || !content) {
      setMsg("Title and description are required ❌");
      return;
    }

    try {
      await api.post("/articles", { title, content });
      setMsg("Article posted successfully ✅");
      setTitle("");
      setContent("");
      setIdeas([]);
      setShowAI(false);
    } catch {
      setMsg("Failed to post article ❌");
    }
  };

  // 💡 AI Writing Suggestions
  const handleGetIdeas = async () => {
    // 🔒 AI ALSO REQUIRES LOGIN
    if (!user) {
      setAiError("🔒 Please login first to use AI suggestions");
      navigate("/login", {
        state: {
          from: { pathname: "/" },
          message: "🔒 Please login first to use AI suggestions",
        },
      });
      return;
    }

    if (content.length < 30) {
      setAiError("Write a bit more before asking AI ✍️");
      return;
    }

    try {
      setAiError("");
      setLoadingAI(true);

      const res = await api.post("/ai/suggest", {
        title,
        content,
      });

      setIdeas(res.data.suggestions);
      setShowAI(true);
    } catch {
      setAiError("AI suggestion failed ❌");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <>
      <AnimatedBackground variant="home" />

      <div className="home-page">
        {/* 🔘 Top actions */}
        <div className="home-actions">
          <button onClick={() => navigate("/my-articles")}>
            My Articles
          </button>
          <button onClick={() => navigate("/explore")}>
            Explore Articles
          </button>
        </div>

        {/* ✍️ Editor wrapper */}
        <div className={`editor-wrapper ${showAI ? "split" : ""}`}>
          {/* 📝 Article Editor */}
          <div className="editor-left">
            <h2>Write a new article</h2>

            <input
              type="text"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              ref={textareaRef}
              placeholder="Write your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="editor-buttons">
              <button onClick={handlePost}>Post Article</button>

              <button className="ai-btn" onClick={handleGetIdeas}>
                💡 Get Writing Ideas
              </button>
            </div>

            {msg && <p className="msg">{msg}</p>}
            {aiError && <p className="msg error">{aiError}</p>}
          </div>

          {/* 🧠 AI Suggestions */}
          {showAI && (
            <div className="editor-right">
              <div className="ai-header">
                <h3>💡 Writing Ideas</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowAI(false)}
                >
                  ✕
                </button>
              </div>

              {loadingAI ? (
                <p className="ai-loading">Thinking… 🤔</p>
              ) : (
                <ul className="ai-list">
                  {ideas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
