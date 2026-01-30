

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Explore() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchExploreArticles = async () => {
      try {
        const res = await api.get("/articles");

        // Filter out current user's articles
        const otherArticles = res.data.filter(
          (article) => article.author?._id !== user.id
        );

        setArticles(otherArticles);
      } catch (err) {
        console.log("Failed to load explore articles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreArticles();
  }, [user]);

  if (loading) {
    return (
      <>
        <AnimatedBackground variant="default" />
        <div className="loading-spinner">
          <p>Loading articles...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground variant="default" />
      <div className="articles-list-page">
        <h2>Explore Articles</h2>

        {articles.length === 0 ? (
          <div className="empty-articles">
            <p>No articles to explore yet.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div
                key={article._id}
                className="article-list-card"
                onClick={() => navigate(`/articles/${article._id}`)}
              >
                <h3>{article.title}</h3>
                <p>{article.content.slice(0, 150)}...</p>
                <small>
                  By: {article.author?.name} ({article.author?.email})
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}