const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No image file provided");
  }

  // Public URL the frontend can use directly in an <img> tag
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  new ApiResponse(201, { url }, "Image uploaded successfully").send(res, 201);
});

module.exports = { uploadImage };
