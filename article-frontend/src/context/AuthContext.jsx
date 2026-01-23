// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// const getUserFromToken = () => {
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return {
//       id: payload.userId,
//       role: payload.role,
//       email: payload.email || "", // if you add email later
//     };
//   } catch {
//     return null;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(getUserFromToken());

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setUser(getUserFromToken());
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuth: !!user,
//         logout,
//         login,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/user/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async () => {
    const res = await api.get("/auth/user/me");
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/user/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
