// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import AnimatedBackground from "../components/AnimatedBackground";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     setIsLoading(true);
//     setMsg("");

//     try {
//       // 👤 USER LOGIN
//       await api.post("/auth/user/login", { email, password });
//       await login();

//       const from = location.state?.from?.pathname || "/";
//       navigate(from, { replace: true });
//     } catch {
//       try {
//         // 👑 ADMIN LOGIN
//         await api.post("/auth/admin/login", { email, password });
//         await login();

//         const from = location.state?.from?.pathname || "/";
//         navigate(from, { replace: true });
//       } catch {
//         setMsgType("error");
//         setMsg("Invalid credentials");
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleLogin();
//   };

//   return (
//     <>
//       <AnimatedBackground variant="auth" />

//       <div className="auth-container">
//         {/* LEFT */}
//         <div className="auth-left">
//           <div className="auth-logo">
//             <div className="auth-logo-icon">📰</div>
//             Article Manager
//           </div>

//           <h1 className="auth-tagline">
//             Manage Your Articles with Ease
//           </h1>

//           <p className="auth-description">
//             A secure platform for writing and enhancing articles with AI.
//           </p>
//         </div>

//         {/* RIGHT */}
//         <div className="auth-right">
//           <div className="auth-card">
//             <h2>Welcome Back</h2>
//             <p className="subtitle">Login to continue</p>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={isLoading}
//               />
//             </div>

//             <button
//               className="auth-submit"
//               onClick={handleLogin}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>

//             {msg && (
//               <div className={`auth-message ${msgType}`}>
//                 {msg}
//               </div>
//             )}

//             <div className="auth-switch">
//               Don’t have an account?
//               <Link to="/register"> Create one</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // 🔔 SHOW MESSAGE IF REDIRECTED FROM PROTECTED ROUTE
  useEffect(() => {
    if (location.state?.message) {
      setMsgType("info");
      setMsg(location.state.message);
    }
  }, [location.state]);

  const handleLogin = async () => {
    setIsLoading(true);
    setMsg("");

    try {
      // 👤 USER LOGIN
      await api.post("/auth/user/login", { email, password });
      await login();

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch {
      try {
        // 👑 ADMIN LOGIN
        await api.post("/auth/admin/login", { email, password });
        await login();

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } catch {
        setMsgType("error");
        setMsg("Invalid credentials");
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <AnimatedBackground variant="auth" />

      <div className="auth-container">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-logo">
            <div className="auth-logo-icon">📰</div>
            Article Manager
          </div>

          <h1 className="auth-tagline">
            Manage Your Articles with Ease
          </h1>

          <p className="auth-description">
            A secure platform for writing and enhancing articles with AI.
          </p>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to continue</p>

            {/* 🔒 REDIRECT MESSAGE */}
            {msg && (
              <div className={`auth-message ${msgType}`}>
                {msg}
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
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
            </div>

            <button
              className="auth-submit"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="auth-switch">
              Don’t have an account?
              <Link to="/register"> Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
