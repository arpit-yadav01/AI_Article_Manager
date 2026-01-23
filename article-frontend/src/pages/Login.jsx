


// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";
// import AnimatedBackground from "../components/AnimatedBackground";
// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState(""); // 'success' or 'error'
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     setMsg("");
//     setIsLoading(true);

//     try {
//       // Try USER login
//       await api.post("/auth/user/login", { email, password });
//       await login();
      
//       setMsgType("success");
//       setMsg("Login successful! Redirecting...");
      
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } catch {
//       try {
//         // Try ADMIN login
//         await api.post("/auth/admin/login", { email, password });
//         await login();
        
//         setMsgType("success");
//         setMsg("Admin login successful! Redirecting...");
        
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } catch {
//         setMsgType("error");
//         setMsg("Invalid credentials. Please try again.");
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLogin();
//     }
//   };

//   return (
//   <>
//     {/* Animated Background */}
//     <AnimatedBackground variant="auth" />

//     {/* Auth Page Container */}
//     <div className="auth-container">
//       {/* Left Side - Branding */}
//       <div className="auth-left">
//         <div className="auth-logo">
//           <div className="auth-logo-icon">📰</div>
//           Article Manager
//         </div>

//         <h1 className="auth-tagline">
//           Manage Your Articles with Ease
//         </h1>

//         <p className="auth-description">
//           A powerful platform for creating, editing, and managing your articles with AI-powered features.
//         </p>

//         <div className="features-list">
//           <div className="feature-item">
//             <div className="feature-icon">✨</div>
//             <div className="feature-text">
//               <h3>AI-Powered Writing</h3>
//               <p>Get intelligent suggestions and summaries</p>
//             </div>
//           </div>

//           <div className="feature-item">
//             <div className="feature-icon">🔒</div>
//             <div className="feature-text">
//               <h3>Secure & Private</h3>
//               <p>Your data is protected with enterprise-grade security</p>
//             </div>
//           </div>

//           <div className="feature-item">
//             <div className="feature-icon">⚡</div>
//             <div className="feature-text">
//               <h3>Lightning Fast</h3>
//               <p>Optimized performance for seamless experience</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="auth-right">
//         <div className="auth-card">
//           <h2>Welcome Back</h2>
//           <p className="subtitle">Login to continue to your account</p>

//           <div className="form-group">
//             <label>Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//             />
//           </div>

//           <button
//             className="auth-submit"
//             onClick={handleLogin}
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>

//           {msg && (
//             <div className={`auth-message ${msgType}`}>
//               {msg}
//             </div>
//           )}

//           <div className="auth-switch">
//             Don&apos;t have an account?
//             <Link to="/register"> Create one now</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setMsg("");
    setIsLoading(true);

    try {
      // Try USER login
      await api.post("/auth/user/login", { email, password });
      await login();
      
      setMsgType("success");
      setMsg("Login successful! Redirecting...");
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch {
      try {
        // Try ADMIN login
        await api.post("/auth/admin/login", { email, password });
        await login();
        
        setMsgType("success");
        setMsg("Admin login successful! Redirecting...");
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch {
        setMsgType("error");
        setMsg("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <AnimatedBackground variant="auth" />
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-left">
          <div className="auth-logo">
            <div className="auth-logo-icon">📰</div>
            Article Manager
          </div>
          
          <h1 className="auth-tagline">
            Manage Your Articles with Ease
          </h1>
          
          <p className="auth-description">
            A powerful platform for creating, editing, and managing your articles with AI-powered features.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <div className="feature-text">
                <h3>AI-Powered Writing</h3>
                <p>Get intelligent suggestions and summaries</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div className="feature-text">
                <h3>Secure & Private</h3>
                <p>Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">
                <h3>Lightning Fast</h3>
                <p>Optimized performance for seamless experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to continue to your account</p>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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

            {msg && (
              <div className={`auth-message ${msgType}`}>
                {msg}
              </div>
            )}

            <div className="auth-switch">
              Don't have an account?
              <Link to="/register">Create one now</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}