const { body } = require("express-validator");

const applianceValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Appliance name is required"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("serialNumber")
    .trim()
    .notEmpty()
    .withMessage("Serial number is required"),

  body("purchaseDate")
    .isISO8601()
    .withMessage("Valid purchase date is required"),

  body("warrantyMonths")
    .isInt({ min: 0 })
    .withMessage("Warranty months must be a positive number"),
];

module.exports = applianceValidator;