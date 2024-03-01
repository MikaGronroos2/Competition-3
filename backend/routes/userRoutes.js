const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", registerUser);

// Log in a user
router.post("/login", loginUser);

// Protect the user data route
router.use(protect);

// Get user data
router.get("/me/:token", getMe);

module.exports = router;
