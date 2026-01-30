import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userAuthRoutes from "./routes/user.auth.routes.js";
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import adminUserRoutes from "./routes/admin.user.routes.js";
import articleRoutes from "./routes/article.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://articlemanagerwithai.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// 🔐 Auth
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/admin", adminAuthRoutes);

// 👮 Admin
app.use("/api/admin/users", adminUserRoutes);

// 📝 Articles
app.use("/api/articles", articleRoutes);

// 🤖 AI
app.use("/api/ai", aiRoutes);

// 🩺 Health
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
