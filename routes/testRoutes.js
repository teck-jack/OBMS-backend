const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user-only", protect, (req, res) => {
  res.send("Hello, authenticated user!");
});

router.get("/admin-only", protect, adminOnly, (req, res) => {
  res.send("Hello, admin!");
});

module.exports = router;
