const User = require("../models/User");
// const Appliance = require("../models/Appliance");
// const ServiceRecord = require("../models/ServiceRecord");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};
const Appliance = require("../models/Appliance");

const getAllAppliances = async (req, res, next) => {
  try {
    const appliances = await Appliance.find()
      .populate("user", "name email role");

    res.status(200).json({
      message: "All appliances fetched successfully",
      count: appliances.length,
      appliances,
    });
  } catch (error) {
    next(error);
  }
};

const ServiceRecord = require("../models/ServiceRecord");

const getAllServiceRecords = async (req, res, next) => {
  try {
    const services = await ServiceRecord.find()
      .populate({
  path: "appliance",
  select: "name brand model serialNumber purchaseDate warrantyMonths",
});
    res.status(200).json({
      message: "All service records fetched successfully",
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot delete your own admin account",
      });
    }

    const appliances = await Appliance.find({
      user: user._id,
    });

    const applianceIds = appliances.map(
      (appliance) => appliance._id
    );

    await ServiceRecord.deleteMany({
      appliance: { $in: applianceIds },
    });

    for (const appliance of appliances) {
      if (appliance.image?.publicId) {
        await deleteFromCloudinary(appliance.image.publicId);
      }
    }

    await Appliance.deleteMany({
      user: user._id,
    });

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      message: "User and related data deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllAppliances,
  getAllServiceRecords,
  deleteUser
};