import { useState } from "react";
import api from "../api/axios";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMsg("Please login first ❌");
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

      setMsg("Article created ✅");
      setTitle("");
      setContent("");
    } catch (err) {
      setMsg("Failed to create article ❌");
    }
  };

  return (
    <div>
      <h2>Create Article</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />

      <button onClick={handleCreate}>Create</button>

      <p>{msg}</p>
    </div>
  );
}
