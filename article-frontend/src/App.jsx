import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import MyArticles from "./pages/MyArticles";
import Explore from "./pages/Explore";
import MyArticle from "./pages/MyArticle";
import PublicArticle from "./pages/PublicArticle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticle from "./pages/CreateArticle";
import PublicRoute from "./components/PublicRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
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


        {/* 🔐 Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
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

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/articles/:id"
          element={
            <ProtectedRoute>
              <PublicArticle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
