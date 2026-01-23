// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://ai-article-manager.onrender.com/api",
//   withCredentials: true, // ✅ REQUIRED for httpOnly cookies
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔑 cookies
});

export default api;
