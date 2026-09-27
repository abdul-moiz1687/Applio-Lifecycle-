const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const validationMiddleware = require("../middleware/validationMiddleware");

const applianceValidator = require("../validators/applianceValidator");

const upload = require("../middleware/uploadMiddleware");

const {
  createAppliance,
  getMyAppliances,
  getApplianceById,
  updateAppliance,
  deleteAppliance,
  getApplianceQRCode,
  getPublicAppliance
} = require("../controllers/applianceController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  applianceValidator,
  validationMiddleware,
  createAppliance
);

router.get("/", authMiddleware, getMyAppliances);

router.get("/:id/qr", authMiddleware, getApplianceQRCode);

router.get(
  "/public/:id",
  getPublicAppliance
);

router.get("/:id", authMiddleware, getApplianceById);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateAppliance
);

router.delete("/:id", authMiddleware, deleteAppliance);

module.exports = router;