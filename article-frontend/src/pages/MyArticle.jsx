// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import AnimatedBackground from "../components/AnimatedBackground";
// import { useAuth } from "../context/AuthContext";

// export default function MyArticle() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [article, setArticle] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isPublished, setIsPublished] = useState(true);

//   // 🤖 AI state
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState("");

//   useEffect(() => {
//     api.get(`/articles/${id}`).then((res) => {
//       setArticle(res.data);
//       setTitle(res.data.title);
//       setContent(res.data.content);
//       setIsPublished(res.data.isPublished);
//     });
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       const res = await api.put(`/articles/${id}`, {
//         title,
//         content,
//         isPublished,
//       });

//       setArticle(res.data);
//       setEditMode(false);
//     } catch (err) {
//       console.log("Failed to update article", err);
//     }
//   };

//   const handleToggleVisibility = async () => {
//     try {
//       const res = await api.put(`/articles/${id}`, {
//         isPublished: !isPublished,
//       });

//       setIsPublished(res.data.isPublished);
//       setArticle(res.data);
//     } catch (err) {
//       console.log("Failed to update visibility", err);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this article?")) {
//       try {
//         await api.delete(`/articles/${id}`);
//         navigate("/my-articles");
//       } catch (err) {
//         console.log("Failed to delete article", err);
//       }
//     }
//   };

//   // 🤖 AI HANDLER
//   const handleAI = async (type) => {
//     try {
//       setAiLoading(true);
//       setAiResult("");

//       const endpointMap = {
//         summarize: "/ai/summarize",
//         mistakes: "/ai/mistakes",
//         improve: "/ai/improve",
//       };

//       const res = await api.post(endpointMap[type], {
//         content: article.content,
//       });

//       setAiResult(res.data.result);
//     } catch (err) {
//       setAiResult("AI failed. Please try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   if (!article) {
//     return (
//       <>
//         <AnimatedBackground variant="default" />
//         <div className="loading-spinner">
//           <p>Loading article...</p>
//         </div>
//       </>
//     );
//   }

//   const isOwner = user?.id === article.author?._id;

//   return (
//     <>
//       <AnimatedBackground variant="default" />

//       <div className="article-page">
//         {/* 🔒 VISIBILITY BADGE */}
//         <div className="visibility-badge">
//           {article.isPublished ? "🌍 Public" : "🔒 Private"}
//         </div>

//         {editMode ? (
//           <>
//             <input
//               className="article-title-input"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <textarea
//               className="article-content-input"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />

//             {isOwner && (
//               <label className="publish-toggle">
//                 <input
//                   type="checkbox"
//                   checked={isPublished}
//                   onChange={() => setIsPublished(!isPublished)}
//                 />
//                 🌍 Public Article
//               </label>
//             )}

//             <div className="article-actions">
//               <button onClick={handleUpdate}>💾 Save Changes</button>
//               <button className="danger" onClick={() => setEditMode(false)}>
//                 ❌ Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <h1 className="article-title">{article.title}</h1>
//             <div className="article-content">{article.content}</div>

//             {isOwner && (
//               <div className="article-actions">
//                 <button onClick={() => setEditMode(true)}>✏️ Edit</button>
//                 <button onClick={handleToggleVisibility}>
//                   {isPublished ? "🔒 Make Private" : "🌍 Make Public"}
//                 </button>
//                 <button className="danger" onClick={handleDelete}>
//                   🗑️ Delete
//                 </button>
//               </div>
//             )}
//           </>
//         )}

//         {/* 🤖 AI ASSISTANT */}
//         {isOwner && !editMode && (
//           <div className="ai-panel">
//             <h3>🧠 AI Assistant</h3>

//             <div className="ai-actions">
//               <button disabled={aiLoading} onClick={() => handleAI("summarize")}>
//                 Summarize
//               </button>
//               <button disabled={aiLoading} onClick={() => handleAI("mistakes")}>
//                 Find Mistakes
//               </button>
//               <button disabled={aiLoading} onClick={() => handleAI("improve")}>
//                 Improve Writing
//               </button>
//             </div>

//             {aiLoading && <p>Thinking...</p>}

//             {aiResult && (
//               <div className="ai-result">
//                 <h4>AI Suggestions</h4>
//                 <pre>{aiResult}</pre>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function MyArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [article, setArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // 🤖 AI state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiRemaining, setAiRemaining] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setIsPublished(res.data.isPublished);
    });
  }, [id]);

  const handleAI = async (type) => {
  try {
    setAiLoading(true);
    setAiResult("");

    const endpointMap = {
      summarize: "/ai/summarize",
      mistakes: "/ai/mistakes",
      improve: "/ai/rewrite", // ✅ FIXED
    };

    const res = await api.post(endpointMap[type], {
      content: article.content,
    });

    setAiResult(res.data.result);
    setAiRemaining(res.data.remaining);
  } catch (err) {
    setAiResult(
      err.response?.data?.message || "AI failed. Please try again."
    );
  } finally {
    setAiLoading(false);
  }
};


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

  const isOwner = user?.id === article.author?._id;

  return (
    <>
      <AnimatedBackground variant="default" />

      <div className="article-page">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-content">{article.content}</div>

        {/* 🤖 AI PANEL */}
        {isOwner && (
          <div className="ai-panel">
            <h3>🧠 AI Assistant</h3>

            {/* 🔢 AI USAGE */}
            <p className="ai-usage">
              {user?.role === "admin"
                ? "🧠 Unlimited AI Access (Admin)"
                : aiRemaining !== null
                ? `🧠 AI Uses Left: ${aiRemaining} / 20`
                : "🧠 AI Uses Left: 20 / 20"}
            </p>

            <div className="ai-actions">
              <button disabled={aiLoading} onClick={() => handleAI("summarize")}>
                Summarize
              </button>
              <button disabled={aiLoading} onClick={() => handleAI("mistakes")}>
                Find Mistakes
              </button>
              <button disabled={aiLoading} onClick={() => handleAI("improve")}>
                Improve Writing
              </button>
            </div>

            {aiLoading && <p>Thinking...</p>}

            {aiResult && (
              <div className="ai-result">
                <h4>AI Output</h4>
                <p>{aiResult}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
