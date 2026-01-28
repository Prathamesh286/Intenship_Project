import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

// Dashboard stats
router.get("/stats", async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ role: "user" });
  const totalReviews = await Review.countDocuments();

  res.json({ totalUsers, activeUsers, totalReviews });
});

// Add this route for user list
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;