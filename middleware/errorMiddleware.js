const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;