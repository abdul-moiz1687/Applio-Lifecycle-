const ServiceRecord = require("../models/ServiceRecord");
const Appliance = require("../models/Appliance");

const createServiceRecord = async (req, res,next) => {
  try {
    const { serviceDate, description, cost, technician } = req.body;

    const appliance = await Appliance.findOne({
      _id: req.params.applianceId,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const serviceRecord = await ServiceRecord.create({
      appliance: appliance._id,
      serviceDate,
      description,
      cost,
      technician,
    });

    res.status(201).json({
      message: "Service record created successfully",
      serviceRecord,
    });
  }catch (error) {
  next(error);
}
};
const getServiceRecords = async (req, res,next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.applianceId,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const services = await ServiceRecord.find({
      appliance: req.params.applianceId,
    }).sort({ serviceDate: -1 });

    res.status(200).json({
      message: "Service records fetched successfully",
      services,
    });
  }catch (error) {
  next(error);
}
};
const updateServiceRecord = async (req, res,next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.applianceId,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const serviceRecord = await ServiceRecord.findOneAndUpdate(
      {
        _id: req.params.serviceId,
        appliance: req.params.applianceId,
      },
      req.body,
      {
  returnDocument: "after",
  runValidators: true,
}
    );

    if (!serviceRecord) {
      return res.status(404).json({
        message: "Service record not found",
      });
    }

    res.status(200).json({
      message: "Service record updated successfully",
      serviceRecord,
    });
  } catch (error) {
  next(error);
}
};
const deleteServiceRecord = async (req, res,next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.applianceId,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const serviceRecord = await ServiceRecord.findOneAndDelete({
      _id: req.params.serviceId,
      appliance: req.params.applianceId,
    });

    if (!serviceRecord) {
      return res.status(404).json({
        message: "Service record not found",
      });
    }

    res.status(200).json({
      message: "Service record deleted successfully",
    });
  } catch (error) {
  next(error);
}
};

module.exports = { createServiceRecord,getServiceRecords,updateServiceRecord,deleteServiceRecord};