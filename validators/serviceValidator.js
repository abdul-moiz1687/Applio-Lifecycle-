const { body } = require("express-validator");

const serviceValidator = [
  body("serviceDate")
    .isISO8601()
    .withMessage("Valid service date is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Service description is required"),

  body("cost")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a valid positive number"),

  body("technician")
    .trim()
    .notEmpty()
    .withMessage("Technician name is required"),
];

module.exports = serviceValidator;