const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/userController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.get(
  "/admin-test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;