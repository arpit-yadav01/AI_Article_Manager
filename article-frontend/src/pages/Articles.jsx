import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles")
      .then((res) => setArticles(res.data))
      .catch(() => console.log("Error fetching articles"));
  }, []);

  return (
    <div>
      <h2>Articles</h2>

      {articles.map((article) => (
        <div key={article._id} style={{ marginBottom: "20px" }}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <small>
            By: {article.author?.name} ({article.author?.email})
          </small>
        </div>
      ))}
    </div>
  );
}
