import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // 🔑 IMPORTANT

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setMsgType("error");
      setMsg("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMsgType("error");
      setMsg("Password must be at least 6 characters long");
      return;
    }

    setMsg("");
    setIsLoading(true);

    try {
      // 🧾 Register
      await api.post("/auth/user/register", {
        name,
        email,
        password,
      });

      // 🔄 Sync auth state (THIS WAS MISSING)
      await login();

      setMsgType("success");
      setMsg("Registration successful! Redirecting...");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // 🚀 Redirect to home
      navigate("/", { replace: true });
    } catch (err) {
      setMsgType("error");
      setMsg(
        err.response?.data?.message ||
          "Registration failed. Email might already be in use."
      );
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <>
      <AnimatedBackground variant="auth" />

      <div className="auth-container">
        {/* Left */}
        <div className="auth-left">
          <div className="auth-logo">
            <div className="auth-logo-icon">📰</div>
            Article Manager
          </div>

          <h1 className="auth-tagline">
            Start Your Writing Journey Today
          </h1>

          <p className="auth-description">
            Join thousands of writers who trust Article Manager for content
            creation.
          </p>
        </div>

        {/* Right */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Create Account</h2>
            <p className="subtitle">
              Sign up to get started with Article Manager
            </p>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <small style={{ fontSize: "13px", color: "#6b7280" }}>
                Password must be at least 6 characters
              </small>
            </div>

            <button
              className="auth-submit"
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {msg && (
              <div className={`auth-message ${msgType}`}>
                {msg}
              </div>
            )}

            <div className="auth-switch">
              Already have an account?
              <Link to="/login"> Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
