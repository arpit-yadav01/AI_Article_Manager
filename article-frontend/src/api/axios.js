import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-article-manager.onrender.com/",
  withCredentials: true, // ✅ REQUIRED for httpOnly cookies
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default api;
