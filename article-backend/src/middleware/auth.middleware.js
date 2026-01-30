
// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       id: decoded.userId,
//       role: decoded.role,
//     };

//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
// export const protectOptional = async (req, res, next) => {
//   try {
//     await protect(req, res, next);
//   } catch {
//     next();
//   }
// };
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * 🔐 STRICT PROTECTION (login required)
 */
export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * 🔓 OPTIONAL PROTECTION (guest allowed)
 * If token exists → attach user
 * If not → continue as guest
 */
export const protectOptional = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(); // guest user
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-passwordHash");

    if (user) {
      req.user = user;
    }

    next();
  } catch {
    // invalid token → treat as guest
    next();
  }
};
