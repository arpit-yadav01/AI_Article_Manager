import axios from "axios";

const api = axios.create({
 baseURL: "https://ai-article-manager.onrender.com/api",

});

export default api;
