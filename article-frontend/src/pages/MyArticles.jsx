import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getUserIdFromToken } from "../api/token";

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArticles = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const res = await api.get("/articles");

        // 🔥 Filter only my articles
        const myArticles = res.data.filter(
          (article) => article.author?._id === userId
        );

        setArticles(myArticles);
      } catch (err) {
        console.log("Failed to load my articles");
      }
    };

    fetchMyArticles();
  }, []);

  return (
    <div>
      <h2>My Articles</h2>

      {articles.length === 0 && <p>No articles created by you.</p>}

      {articles.map((article) => (
        <div
          key={article._id}
          style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
        >
          <h3
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/my-articles/${article._id}`)}
          >
            {article.title}
          </h3>

          <p>{article.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
