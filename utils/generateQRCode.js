const QRCode = require("qrcode");

const generateQRCode = async (text) => {
  const qrCode = await QRCode.toDataURL(text);

  return qrCode;
};

module.exports = generateQRCode;