import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // 1️⃣ Try USER login
      const res = await api.post("/auth/user/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/");
    } catch {
      try {
        // 2️⃣ If user login fails → try ADMIN login
        const res = await api.post("/auth/admin/login", {
          email,
          password,
        });

        login(res.data.token);
        navigate("/");
      } catch {
        setMsg("Invalid credentials ❌");
      }
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p className="error">{msg}</p>
    </div>
  );
}
