const cloudinary = require("cloudinary").v2;

const uploadImageCloudinary = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const mimetype = req.file.mimetype;
  const base64Image = req.file.buffer.toString("base64");
  const result = await cloudinary.uploader.upload(
    `data:${mimetype};base64,${base64Image}`
  );

  req.file.secure_url = result.secure_url;
  next();
};

module.exports = uploadImageCloudinary;
