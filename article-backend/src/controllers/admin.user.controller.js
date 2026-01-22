import User from "../models/User.js";

export const makeAdmin = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role === "admin") {
    return res.status(400).json({ message: "User is already admin" });
  }

  user.role = "admin";
  await user.save();

  res.json({
    message: "User promoted to admin",
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};

export const removeAdmin = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "admin") {
    return res.status(400).json({ message: "User is not admin" });
  }

  user.role = "user";
  await user.save();

  res.json({
    message: "Admin role removed",
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};
