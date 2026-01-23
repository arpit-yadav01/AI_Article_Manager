import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for auth check to finish
  if (loading) {
    return <div>Loading...</div>;
  }

  // If already logged in → redirect home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow access
  return children;
}
