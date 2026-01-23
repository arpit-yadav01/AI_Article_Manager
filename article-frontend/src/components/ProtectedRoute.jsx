// import { Navigate } from "react-router-dom";
// import { isLoggedIn } from "../api/auth";

// export default function ProtectedRoute({ children }) {
//   if (!isLoggedIn()) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
