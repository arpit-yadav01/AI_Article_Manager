// import express from "express";
// import { registerUser, loginUser } from "../controllers/user.auth.controller.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;

import express from "express";
import { registerUser, loginUser } from "../controllers/user.auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// session restore
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

// logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
});

export default router;
