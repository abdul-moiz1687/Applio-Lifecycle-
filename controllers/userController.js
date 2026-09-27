const getProfile = (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user,
  });
};

module.exports = { getProfile };