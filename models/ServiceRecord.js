const mongoose  = require('mongoose')

const serviceRecordSchema = mongoose.Schema(
{
    appliance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appliance",
      required: true,
    },

    serviceDate: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
    },

    technician: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const ServiceRecord = mongoose.model('ServiceRecord',serviceRecordSchema);

module.exports = ServiceRecord;