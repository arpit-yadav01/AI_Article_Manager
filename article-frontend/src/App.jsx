import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import MyArticles from "./pages/MyArticles";
import Explore from "./pages/Explore";
import MyArticle from "./pages/MyArticle";
import PublicArticle from "./pages/PublicArticle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticle from "./pages/CreateArticle";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/articles/:id" element={<PublicArticle />} />

        {/* 🔓 AUTH PAGES (BLOCK IF LOGGED IN) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-articles"
          element={
            <ProtectedRoute>
              <MyArticles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-articles/:id"
          element={
            <ProtectedRoute>
              <MyArticle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
