import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3>Article Manager</h3>

      <div className="nav-right">
        <Link to="/">Home</Link>

        {isAuth && (
          <span className="nav-user">
            Hello, <strong>{user?.email || "User"}</strong>
            {user?.role === "admin" && " (Admin)"}
          </span>
        )}

        {isAuth ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
