import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function PublicArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);

  // 🤖 AI states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiRemaining, setAiRemaining] = useState(null);

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => console.log("Failed to load article"));
  }, [id]);

  if (!article) {
    return (
      <>
        <AnimatedBackground variant="default" />
        <div className="loading-spinner">
          <p>Loading article...</p>
        </div>
      </>
    );
  }

  const isLoggedIn = !!user;

  // 🔒 LOGIN GUARD
  const requireLogin = () => {
    navigate("/login", {
      state: {
        from: { pathname: `/articles/${id}` },
        message: "🔒 Please login to use AI tools",
      },
    });
  };

  // 🤖 AI: SUMMARIZE (ALLOWED)
  const handleSummarize = async () => {
    if (!isLoggedIn) return requireLogin();

    try {
      setAiLoading(true);
      setAiError("");
      setAiResult("");

      const res = await api.post("/ai/summarize", {
        content: article.content,
      });

      setAiResult(res.data.result);
      setAiRemaining(res.data.remaining);
    } catch (err) {
      setAiError(
        err.response?.data?.message || "AI summarize failed"
      );
    } finally {
      setAiLoading(false);
    }
  };

  // 🤖 AI: FIND MISTAKES (ALLOWED)
  const handleFindMistakes = async () => {
    if (!isLoggedIn) return requireLogin();

    try {
      setAiLoading(true);
      setAiError("");
      setAiResult("");

      const res = await api.post("/ai/mistakes", {
        content: article.content,
      });

      setAiResult(res.data.result);
      setAiRemaining(res.data.remaining);
    } catch (err) {
      setAiError(
        err.response?.data?.message || "AI analysis failed"
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground variant="default" />

      <div className="article-page">
        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          By {article.author?.name} ({article.author?.email})
        </div>

        <div className="article-content">{article.content}</div>

        {/* 🤖 AI TOOLS (READ-ONLY MODE) */}
        <div className="ai-panel">
          <h3>🧠 AI Tools (Read-Only)</h3>

          <p className="ai-hint">
            AI tools are available for understanding this article.
            Editing is disabled.
          </p>

          {/* 🔢 AI USAGE */}
          {isLoggedIn && (
            <p className="ai-usage">
              {user.role === "admin"
                ? "🧠 Unlimited AI Access (Admin)"
                : aiRemaining !== null
                ? `🧠 AI Uses Left: ${aiRemaining} / 20`
                : "🧠 AI Uses Left: 20 / 20"}
            </p>
          )}

          <div className="ai-actions">
            <button disabled={aiLoading} onClick={handleSummarize}>
              ✨ Summarize
            </button>

            <button disabled={aiLoading} onClick={handleFindMistakes}>
              🧠 Find Mistakes
            </button>

            {/* ❌ DISABLED BY DESIGN */}
            <button disabled title="You cannot edit others' articles">
              🚫 Improve Writing
            </button>
          </div>

          {aiLoading && <p>Thinking...</p>}
          {aiError && <p className="ai-error">{aiError}</p>}

          {/* 🧠 AI OUTPUT */}
          {/* {aiResult && (
            <div className="ai-result">
              <h4>AI Output</h4>
              <p className="ai-output">{aiResult}</p>
            </div>
          )} */}

          {aiResult && (
  <div className="ai-result">
    <h4>AI Output</h4>
    <div className="ai-output">
      {aiResult.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </>
  );
}
