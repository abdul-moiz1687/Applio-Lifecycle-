const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    warrantyMonths: {
      type: Number,
      required: true,
    },
    image: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},
  },
 {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
}
);

applianceSchema.virtual("warrantyExpiry").get(function () {
  const expiryDate = new Date(this.purchaseDate);

  expiryDate.setMonth(
    expiryDate.getMonth() + this.warrantyMonths
  );

  return expiryDate;
});

applianceSchema.virtual("warrantyStatus").get(function () {
  return this.warrantyExpiry >= new Date()
    ? "Active"
    : "Expired";
});

const Appliance = mongoose.model("Appliance", applianceSchema);

module.exports = Appliance;