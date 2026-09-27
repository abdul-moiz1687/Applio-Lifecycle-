const { Readable } = require("stream");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
  {
    folder: "homecare/appliances",
    resource_type: "image",
  },
  (error, result) => {
    if (error) {
      console.error("Cloudinary FULL ERROR:");
      console.error(JSON.stringify(error, null, 2));

      return reject(error);
    }

    resolve(result);
  }
);
    Readable.from(buffer).pipe(uploadStream);
  });
};

module.exports = uploadToCloudinary;