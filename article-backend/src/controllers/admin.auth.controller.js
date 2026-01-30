// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { generateToken } from "../utils/jwt.js";

// /**
//  * 🔑 ADMIN LOGIN
//  */
// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await User.findOne({ email, role: "admin" });
//     if (!admin) {
//       return res.status(401).json({ message: "Not an admin" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.passwordHash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       token: generateToken(admin),
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Admin login failed" });
//   }
// };

// /**
//  * 🔐 BOOTSTRAP FIRST ADMIN (ONE TIME)
//  */
// export const registerFirstAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if any admin already exists
//     const adminExists = await User.findOne({ role: "admin" });
//     if (adminExists) {
//       return res
//         .status(403)
//         .json({ message: "Admin already exists. Contact administrator." });
//     }

//     // Check duplicate email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const admin = await User.create({
//       name,
//       email,
//       passwordHash,
//       role: "admin"
//     });

//     res.status(201).json({
//       message: "First admin created",
//       token: generateToken(admin),
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Admin registration failed" });
//   }
// };



import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

/**
 * 🔑 ADMIN LOGIN
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Not an admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin);

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Admin login failed" });
  }
};

/**
 * 🔐 BOOTSTRAP FIRST ADMIN (ONE TIME)
 */
export const registerFirstAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res
        .status(403)
        .json({ message: "Admin already exists. Contact administrator." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      passwordHash,
      role: "admin",
    });

    const token = generateToken(admin);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "First admin created",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Admin registration failed" });
  }
};
