import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    const token = localStorage.getItem("token");

    await api.put(
      `/articles/${id}`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditMode(false);
    setArticle({ ...article, title, content });
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await api.delete(`/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/my-articles");
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-page">
      {editMode ? (
        <>
          <input
            className="article-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="article-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1 className="article-title">{article.title}</h1>

          <div className="article-content">{article.content}</div>

          <div className="article-actions">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
