import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getRoleFromToken } from "../api/token";

export default function PublicArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = getRoleFromToken();

  const [article, setArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 🧠 AI states
  const [summary, setSummary] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleUpdate = async (newContent = content) => {
    const token = localStorage.getItem("token");

    await api.put(
      `/articles/${id}`,
      { title, content: newContent },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditMode(false);
    setArticle({ ...article, content: newContent });
    setContent(newContent);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await api.delete(`/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/explore");
  };

  // ✨ AI Summarize
  const handleSummarize = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setSummary("");
      setImprovedText("");
      setMistakes("");

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/summarize",
        { content: article.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSummary(res.data.summary);
    } catch {
      setAiError("AI summarize failed");
    } finally {
      setAiLoading(false);
    }
  };

  // ✨ AI Improve Writing
  const handleImproveWriting = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setImprovedText("");
      setSummary("");
      setMistakes("");

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/rewrite",
        { content: article.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImprovedText(res.data.improved);
    } catch {
      setAiError("AI rewrite failed");
    } finally {
      setAiLoading(false);
    }
  };

  // 🧠 AI Find Mistakes
  const handleFindMistakes = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setMistakes("");
      setSummary("");
      setImprovedText("");

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/ai/mistakes",
        { content: article.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMistakes(res.data.feedback);
    } catch {
      setAiError("AI mistake analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>

      <div className="article-meta">
        By {article.author?.name} ({article.author?.email})
      </div>

      <div className="article-content">{article.content}</div>

      {role === "admin" && (
        <div className="article-actions">
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>

          <button className="ai-btn" onClick={handleSummarize} disabled={aiLoading}>
            ✨ Summarize
          </button>

          <button className="ai-btn" onClick={handleImproveWriting} disabled={aiLoading}>
            ✨ Improve Writing
          </button>

          <button className="ai-btn" onClick={handleFindMistakes} disabled={aiLoading}>
            🧠 Find Mistakes
          </button>
        </div>
      )}

      {aiError && <p className="ai-error">{aiError}</p>}

      {/* 🧠 AI Summary */}
      {summary && (
        <div className="ai-box">
          <h3>AI Summary</h3>
          <pre>{summary}</pre>
        </div>
      )}

      {/* ✨ AI Improved Writing */}
      {improvedText && (
        <div className="ai-box">
          <h3>AI Improved Version</h3>
          <pre>{improvedText}</pre>

          <div className="ai-actions">
            <button onClick={() => handleUpdate(improvedText)}>
              ✅ Apply Changes
            </button>
            <button className="danger" onClick={() => setImprovedText("")}>
              ❌ Discard
            </button>
          </div>
        </div>
      )}

      {/* 🧠 AI Mistakes */}
      {mistakes && (
        <div className="ai-box">
          <h3>Writing Feedback & Suggestions</h3>
          <pre>{mistakes}</pre>
        </div>
      )}
    </div>
  );
}
