


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function MyArticle() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [article, setArticle] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     api.get(`/articles/${id}`).then((res) => {
//       setArticle(res.data);
//       setTitle(res.data.title);
//       setContent(res.data.content);
//     });
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       await api.put(`/articles/${id}`, { title, content });
//       setEditMode(false);
//       setArticle({ ...article, title, content });
//     } catch (err) {
//       console.log("Failed to update article", err);
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

//   if (!article) {
//     return (
//       <div className="loading-spinner">
//         <p>Loading article...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="article-page">
//       {editMode ? (
//         <>
//           <input
//             className="article-title-input"
//             placeholder="Article Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <textarea
//             className="article-content-input"
//             placeholder="Article Content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />

//           <div className="article-actions">
//             <button onClick={handleUpdate}>💾 Save Changes</button>
//             <button className="danger" onClick={() => setEditMode(false)}>
//               ❌ Cancel
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <h1 className="article-title">{article.title}</h1>

//           <div className="article-content">{article.content}</div>

//           <div className="article-actions">
//             <button onClick={() => setEditMode(true)}>✏️ Edit</button>
//             <button className="danger" onClick={handleDelete}>
//               🗑️ Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";

export default function MyArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/articles/${id}`, { title, content });
      setEditMode(false);
      setArticle({ ...article, title, content });
    } catch (err) {
      console.log("Failed to update article", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await api.delete(`/articles/${id}`);
        navigate("/my-articles");
      } catch (err) {
        console.log("Failed to delete article", err);
      }
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

  return (
    <>
      <AnimatedBackground variant="default" />
      <div className="article-page">
        {editMode ? (
          <>
            <input
              className="article-title-input"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="article-content-input"
              placeholder="Article Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="article-actions">
              <button onClick={handleUpdate}>💾 Save Changes</button>
              <button className="danger" onClick={() => setEditMode(false)}>
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="article-title">{article.title}</h1>

            <div className="article-content">{article.content}</div>

            <div className="article-actions">
              <button onClick={() => setEditMode(true)}>✏️ Edit</button>
              <button className="danger" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}