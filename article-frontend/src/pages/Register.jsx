
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api/axios";
// import AnimatedBackground from "../components/AnimatedBackground";
// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState(""); // 'success' or 'error'
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRegister = async () => {
//     // Basic validation
//     if (!name || !email || !password) {
//       setMsgType("error");
//       setMsg("Please fill in all fields");
//       return;
//     }

//     if (password.length < 6) {
//       setMsgType("error");
//       setMsg("Password must be at least 6 characters long");
//       return;
//     }

//     setMsg("");
//     setIsLoading(true);

//     try {
//       await api.post("/auth/user/register", {
//         name,
//         email,
//         password,
//       });

//       setMsgType("success");
//       setMsg("Registration successful! You can now login.");
      
//       // Clear form
//       setName("");
//       setEmail("");
//       setPassword("");
//       setIsLoading(false);
//     } catch (err) {
//       setMsgType("error");
//       setMsg(err.response?.data?.message || "Registration failed. Email might already be in use.");
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleRegister();
//     }
//   };
// return (
//   <>
//     {/* Animated Background */}
//     <AnimatedBackground variant="auth" />

//     {/* Auth Page Container (ONLY ONE) */}
//     <div className="auth-container">
//       {/* Left Side - Branding */}
//       <div className="auth-left">
//         <div className="auth-logo">
//           <div className="auth-logo-icon">📰</div>
//           Article Manager
//         </div>

//         <h1 className="auth-tagline">
//           Start Your Writing Journey Today
//         </h1>

//         <p className="auth-description">
//           Join thousands of writers who trust Article Manager for their content creation needs.
//         </p>

//         <div className="features-list">
//           <div className="feature-item">
//             <div className="feature-icon">📝</div>
//             <div className="feature-text">
//               <h3>Rich Editor</h3>
//               <p>Intuitive interface for seamless writing</p>
//             </div>
//           </div>

//           <div className="feature-item">
//             <div className="feature-icon">🤖</div>
//             <div className="feature-text">
//               <h3>AI Assistant</h3>
//               <p>Smart suggestions to enhance your content</p>
//             </div>
//           </div>

//           <div className="feature-item">
//             <div className="feature-icon">📊</div>
//             <div className="feature-text">
//               <h3>Analytics</h3>
//               <p>Track performance and engagement metrics</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Register Form */}
//       <div className="auth-right">
//         <div className="auth-card">
//           <h2>Create Account</h2>
//           <p className="subtitle">
//             Sign up to get started with Article Manager
//           </p>

//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//             />
//           </div>

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
//               placeholder="Create a strong password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={isLoading}
//             />
//             <small style={{ color: "#6b7280", fontSize: "13px" }}>
//               Password must be at least 6 characters long
//             </small>
//           </div>

//           <button
//             className="auth-submit"
//             onClick={handleRegister}
//             disabled={isLoading}
//           >
//             {isLoading ? "Creating Account..." : "Create Account"}
//           </button>

//           {msg && <div className={`auth-message ${msgType}`}>{msg}</div>}

//           <div className="auth-switch">
//             Already have an account?
//             <Link to="/login"> Login here</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );
// }



import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Basic validation
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
      await api.post("/auth/user/register", {
        name,
        email,
        password,
      });

      setMsgType("success");
      setMsg("Registration successful! You can now login.");
      
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (err) {
      setMsgType("error");
      setMsg(err.response?.data?.message || "Registration failed. Email might already be in use.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
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
            Start Your Writing Journey Today
          </h1>
          
          <p className="auth-description">
            Join thousands of writers who trust Article Manager for their content creation needs.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <div className="feature-text">
                <h3>Rich Editor</h3>
                <p>Intuitive interface for seamless writing</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🤖</div>
              <div className="feature-text">
                <h3>AI Assistant</h3>
                <p>Smart suggestions to enhance your content</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>Analytics</h3>
                <p>Track performance and engagement metrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>Create Account</h2>
            <p className="subtitle">Sign up to get started with Article Manager</p>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <small style={{color: '#6b7280', fontSize: '13px', marginTop: '5px', display: 'block'}}>
                Password must be at least 6 characters long
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
              <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}