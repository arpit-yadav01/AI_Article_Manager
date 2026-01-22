import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getUserIdFromToken } from "../api/token";

export default function Explore() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExploreArticles = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const res = await api.get("/articles");

        // 🔥 Filter only OTHER users' articles
        const otherArticles = res.data.filter(
          (article) => article.author?._id !== userId
        );

        setArticles(otherArticles);
      } catch {
        console.log("Failed to load explore articles");
      }
    };

    fetchExploreArticles();
  }, []);

  return (
    <div>
      <h2>Explore Articles</h2>

      {articles.length === 0 && <p>No articles to explore.</p>}

      {articles.map((article) => (
        <div
          key={article._id}
          style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
        >
          <h3
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/articles/${article._id}`)}
          >
            {article.title}
          </h3>

          <p>{article.content.slice(0, 100)}...</p>

          <small>
            By: {article.author?.name} ({article.author?.email})
          </small>
        </div>
      ))}
    </div>
  );
}
