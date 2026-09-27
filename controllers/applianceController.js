const Appliance = require("../models/Appliance");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const deleteFromCloudinary = require("../utils/deleteFromCloudinary");
const generateQRCode = require("../utils/generateQRCode");
const ServiceRecord = require("../models/ServiceRecord");

const createAppliance = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      model,
      serialNumber,
      purchaseDate,
      warrantyMonths,
    } = req.body;

    let image = {
      url: "",
      publicId: "",
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const appliance = await Appliance.create({
      user: req.user.id,
      name,
      brand,
      model,
      serialNumber,
      purchaseDate,
      warrantyMonths,
      image,
    });

    res.status(201).json({
      message: "Appliance created successfully",
      appliance,
    });
  } catch (error) {
    next(error);
  }
};

const getMyAppliances = async (req, res, next) => {
  try {
    const { search, brand } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {
      user: req.user.id,
    };

    if (brand) {
      filter.brand = brand;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    const appliances = await Appliance.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await Appliance.countDocuments(filter);

    res.status(200).json({
      message: "Appliances fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      appliances,
    });
  } catch (error) {
    next(error);
  }
};
const getApplianceById = async (req, res,next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    res.status(200).json({
      message: "Appliance fetched successfully",
      appliance,
    });
  } catch (error) {
  next(error);
}
};
const getApplianceQRCode = async (req, res, next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const publicUrl = `${process.env.PUBLIC_APP_URL}/passport/${appliance._id}`;

const qrCode = await generateQRCode(publicUrl);

    res.status(200).json({
      message: "QR code generated successfully",
      publicUrl,
      qrCode,
    });
  } catch (error) {
    next(error);
  }
};
const updateAppliance = async (req, res, next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      const newImage = await uploadToCloudinary(req.file.buffer);

      if (appliance.image?.publicId) {
        await deleteFromCloudinary(appliance.image.publicId);
      }

      updateData.image = {
        url: newImage.secure_url,
        publicId: newImage.public_id,
      };
    }

    const updatedAppliance = await Appliance.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Appliance updated successfully",
      appliance: updatedAppliance,
    });
  } catch (error) {
    next(error);
  }
};
const deleteAppliance = async (req, res, next) => {
  try {
    const appliance = await Appliance.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    if (appliance.image?.publicId) {
      await deleteFromCloudinary(appliance.image.publicId);
    }

    await Appliance.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.status(200).json({
      message: "Appliance and image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getPublicAppliance = async (req, res, next) => {
  try {
    const appliance = await Appliance.findById(req.params.id).select(
      "name brand model serialNumber purchaseDate warrantyMonths image createdAt"
    );

    if (!appliance) {
      return res.status(404).json({
        message: "Appliance not found",
      });
    }

    const services = await ServiceRecord.find({
      appliance: appliance._id,
    })
      .select("serviceDate description cost technician")
      .sort({ serviceDate: -1 });

    res.status(200).json({
      appliance,
      services,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAppliance,getMyAppliances,getApplianceById,updateAppliance,deleteAppliance,getApplianceQRCode,getPublicAppliance};