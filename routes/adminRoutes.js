const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const { getAllUsers,getAllAppliances,getAllServiceRecords,deleteUser } = require("../controllers/adminController");

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);
router.get(
  "/appliances",
  authMiddleware,
  adminMiddleware,
  getAllAppliances
);

router.get(
  "/services",
  authMiddleware,
  adminMiddleware,
  getAllServiceRecords
);
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;