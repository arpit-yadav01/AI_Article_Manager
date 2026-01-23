// import express from "express";
// import cors from "cors";

// import userAuthRoutes from "./routes/user.auth.routes.js";
// import adminAuthRoutes from "./routes/admin.auth.routes.js";
// import adminUserRoutes from "./routes/admin.user.routes.js";
// import articleRoutes from "./routes/article.routes.js";
// import aiRoutes from "./routes/ai.routes.js";



// const app = express(); // ✅ app must be created FIRST

// app.use(cors());
// app.use(express.json());

// // 🔐 Auth routes
// app.use("/api/auth/user", userAuthRoutes);
// app.use("/api/auth/admin", adminAuthRoutes);

// // 👮 Admin user management
// app.use("/api/admin/users", adminUserRoutes);

// // 📝 Article routes
// app.use("/api/articles", articleRoutes);

// // 🤖 AI routes
// app.use("/api/ai", aiRoutes);
// // Health check
// app.get("/", (req, res) => {
//   res.json({ message: "API is running 🚀" });
// });

// export default app;



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userAuthRoutes from "./routes/user.auth.routes.js";
import adminAuthRoutes from "./routes/admin.auth.routes.js";
import adminUserRoutes from "./routes/admin.user.routes.js";
import articleRoutes from "./routes/article.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

/**
 * ✅ ALLOWED ORIGINS
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://articlemanagerwithai.netlify.app",
];

/**
 * ✅ CORS CONFIG (COOKIE SAFE)
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server & Postman
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

// 🔐 Auth routes
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/admin", adminAuthRoutes);

// 👮 Admin user management
app.use("/api/admin/users", adminUserRoutes);

// 📝 Article routes
app.use("/api/articles", articleRoutes);

// 🤖 AI routes
app.use("/api/ai", aiRoutes);

// 🩺 Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
