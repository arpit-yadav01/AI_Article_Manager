import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const res = await api.get("/articles/mine");
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to load my articles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, []);

  if (loading) {
    return (
      <>
        <AnimatedBackground variant="default" />
        <div className="loading-spinner">
          <p>Loading your articles...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground variant="default" />
      <div className="articles-list-page">
        <h2>My Articles</h2>

        {articles.length === 0 ? (
          <div className="empty-articles">
            <p>You haven't created any articles yet.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div
                key={article._id}
                className="article-list-card"
                onClick={() => navigate(`/my-articles/${article._id}`)}
              >
                <h3>{article.title}</h3>
                <p>{article.content.slice(0, 150)}...</p>
                <small>
                  {article.isPublished ? "🌍 Public" : "🔒 Private"}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
