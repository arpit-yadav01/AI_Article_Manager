import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const handlePost = async () => {
    const token = localStorage.getItem("token");

    if (!title || !content) {
      setMsg("Title and description are required ❌");
      return;
    }

    try {
      await api.post(
        "/articles",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("Article posted successfully ✅");
      setTitle("");
      setContent("");
    } catch {
      setMsg("Failed to post article ❌");
    }
  };

  return (
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

      {/* ✍️ Article writing box */}
      <div className="write-box">
        <h2>Write a new article</h2>

        <input
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your article description here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="post-btn" onClick={handlePost}>
          Post Article
        </button>

        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}
