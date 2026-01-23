
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// export default function PublicArticle() {
//   const { id } = useParams();
//   const { user } = useAuth();

//   const [article, setArticle] = useState(null);

//   // AI states
//   const [summary, setSummary] = useState("");
//   const [improvedText, setImprovedText] = useState("");
//   const [mistakes, setMistakes] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiError, setAiError] = useState("");

//   useEffect(() => {
//     api
//       .get(`/articles/${id}`)
//       .then((res) => setArticle(res.data))
//       .catch(() => console.log("Failed to load article"));
//   }, [id]);

//   if (!article) {
//     return (
//       <div className="loading-spinner">
//         <p>Loading article...</p>
//       </div>
//     );
//   }

//   const isAdmin = user?.role === "admin";

//   // AI: Summarize
//   const handleSummarize = async () => {
//     try {
//       setAiLoading(true);
//       setAiError("");
//       setSummary("");
//       setImprovedText("");
//       setMistakes("");

//       const res = await api.post("/ai/summarize", {
//         content: article.content,
//       });

//       setSummary(res.data.summary);
//     } catch {
//       setAiError("AI summarize failed. Please try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // AI: Improve writing
//   const handleImproveWriting = async () => {
//     try {
//       setAiLoading(true);
//       setAiError("");
//       setImprovedText("");
//       setSummary("");
//       setMistakes("");

//       const res = await api.post("/ai/rewrite", {
//         content: article.content,
//       });

//       setImprovedText(res.data.improved);
//     } catch {
//       setAiError("AI rewrite failed. Please try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // AI: Find mistakes
//   const handleFindMistakes = async () => {
//     try {
//       setAiLoading(true);
//       setAiError("");
//       setMistakes("");
//       setSummary("");
//       setImprovedText("");

//       const res = await api.post("/ai/mistakes", {
//         content: article.content,
//       });

//       setMistakes(res.data.feedback);
//     } catch {
//       setAiError("AI mistake analysis failed. Please try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // Apply improved text
//   const handleApplyImprovedText = async () => {
//     try {
//       await api.put(`/articles/${id}`, {
//         title: article.title,
//         content: improvedText,
//       });

//       setArticle({ ...article, content: improvedText });
//       setImprovedText("");
//     } catch {
//       setAiError("Failed to apply changes.");
//     }
//   };

//   return (
//     <div className="article-page">
//       <h1 className="article-title">{article.title}</h1>

//       <div className="article-meta">
//         <span>
//           By: {article.author?.name} ({article.author?.email})
//         </span>
//       </div>

//       <div className="article-content">{article.content}</div>

//       {/* ADMIN AI TOOLS */}
//       {isAdmin && (
//         <div className="article-actions">
//           <button onClick={handleSummarize} disabled={aiLoading}>
//             ✨ Summarize
//           </button>

//           <button onClick={handleImproveWriting} disabled={aiLoading}>
//             ✨ Improve Writing
//           </button>

//           <button onClick={handleFindMistakes} disabled={aiLoading}>
//             🧠 Find Mistakes
//           </button>
//         </div>
//       )}

//       {aiError && <p className="ai-error">{aiError}</p>}

//       {/* AI Summary */}
//       {summary && (
//         <div className="ai-box">
//           <h3>✨ AI Summary</h3>
//           <pre>{summary}</pre>
//         </div>
//       )}

//       {/* AI Improved Writing */}
//       {improvedText && (
//         <div className="ai-box">
//           <h3>✨ AI Improved Version</h3>
//           <pre>{improvedText}</pre>

//           <div className="ai-actions">
//             <button onClick={handleApplyImprovedText}>
//               ✅ Apply Changes
//             </button>
//             <button className="danger" onClick={() => setImprovedText("")}>
//               ❌ Discard
//             </button>
//           </div>
//         </div>
//       )}

//       {/* AI Mistakes */}
//       {mistakes && (
//         <div className="ai-box">
//           <h3>🧠 Writing Feedback & Suggestions</h3>
//           <pre>{mistakes}</pre>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function PublicArticle() {
  const { id } = useParams();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);

  // AI states
  const [summary, setSummary] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

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

  const isAdmin = user?.role === "admin";

  // AI: Summarize
  const handleSummarize = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setSummary("");
      setImprovedText("");
      setMistakes("");

      const res = await api.post("/ai/summarize", {
        content: article.content,
      });

      setSummary(res.data.summary);
    } catch {
      setAiError("AI summarize failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // AI: Improve writing
  const handleImproveWriting = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setImprovedText("");
      setSummary("");
      setMistakes("");

      const res = await api.post("/ai/rewrite", {
        content: article.content,
      });

      setImprovedText(res.data.improved);
    } catch {
      setAiError("AI rewrite failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // AI: Find mistakes
  const handleFindMistakes = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setMistakes("");
      setSummary("");
      setImprovedText("");

      const res = await api.post("/ai/mistakes", {
        content: article.content,
      });

      setMistakes(res.data.feedback);
    } catch {
      setAiError("AI mistake analysis failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // Apply improved text
  const handleApplyImprovedText = async () => {
    try {
      await api.put(`/articles/${id}`, {
        title: article.title,
        content: improvedText,
      });

      setArticle({ ...article, content: improvedText });
      setImprovedText("");
    } catch {
      setAiError("Failed to apply changes.");
    }
  };

  return (
    <>
      <AnimatedBackground variant="default" />
      <div className="article-page">
        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          <span>
            By: {article.author?.name} ({article.author?.email})
          </span>
        </div>

        <div className="article-content">{article.content}</div>

        {/* ADMIN AI TOOLS */}
        {isAdmin && (
          <div className="article-actions">
            <button onClick={handleSummarize} disabled={aiLoading}>
              ✨ Summarize
            </button>

            <button onClick={handleImproveWriting} disabled={aiLoading}>
              ✨ Improve Writing
            </button>

            <button onClick={handleFindMistakes} disabled={aiLoading}>
              🧠 Find Mistakes
            </button>
          </div>
        )}

        {aiError && <p className="ai-error">{aiError}</p>}

        {/* AI Summary */}
        {summary && (
          <div className="ai-box">
            <h3>✨ AI Summary</h3>
            <pre>{summary}</pre>
          </div>
        )}

        {/* AI Improved Writing */}
        {improvedText && (
          <div className="ai-box">
            <h3>✨ AI Improved Version</h3>
            <pre>{improvedText}</pre>

            <div className="ai-actions">
              <button onClick={handleApplyImprovedText}>
                ✅ Apply Changes
              </button>
              <button className="danger" onClick={() => setImprovedText("")}>
                ❌ Discard
              </button>
            </div>
          </div>
        )}

        {/* AI Mistakes */}
        {mistakes && (
          <div className="ai-box">
            <h3>🧠 Writing Feedback & Suggestions</h3>
            <pre>{mistakes}</pre>
          </div>
        )}
      </div>
    </>
  );
}