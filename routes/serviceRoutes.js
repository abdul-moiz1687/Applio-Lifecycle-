const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const serviceValidator = require("../validators/serviceValidator");
const {
  createServiceRecord,getServiceRecords,updateServiceRecord,deleteServiceRecord,
} = require("../controllers/serviceController");

const router = express.Router();

router.post(
  "/:applianceId/services",
  authMiddleware,
  serviceValidator,
  validationMiddleware,
  createServiceRecord
);

router.get(
  "/:applianceId/services",
  authMiddleware,
  getServiceRecords
);
router.put(
  "/:applianceId/services/:serviceId",
  authMiddleware,
  updateServiceRecord
);
router.delete(
  "/:applianceId/services/:serviceId",
  authMiddleware,
  deleteServiceRecord
);

module.exports = router;