

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// export default function MyArticles() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!user) return;

//     const fetchMyArticles = async () => {
//       try {
//         const res = await api.get("/articles");

//         // Only my articles
//         const myArticles = res.data.filter(
//           (article) => article.author?._id === user.id
//         );

//         setArticles(myArticles);
//       } catch (err) {
//         console.log("Failed to load my articles", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyArticles();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <p>Loading your articles...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="articles-list-page">
//       <h2>My Articles</h2>

//       {articles.length === 0 ? (
//         <div className="empty-articles">
//           <p>You haven't created any articles yet.</p>
//         </div>
//       ) : (
//         <div className="articles-grid">
//           {articles.map((article) => (
//             <div
//               key={article._id}
//               className="article-list-card"
//               onClick={() => navigate(`/my-articles/${article._id}`)}
//             >
//               <h3>{article.title}</h3>
//               <p>{article.content.slice(0, 150)}...</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchMyArticles = async () => {
      try {
        const res = await api.get("/articles");

        // Only my articles
        const myArticles = res.data.filter(
          (article) => article.author?._id === user.id
        );

        setArticles(myArticles);
      } catch (err) {
        console.log("Failed to load my articles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArticles();
  }, [user]);

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
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}