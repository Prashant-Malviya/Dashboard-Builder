const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const layoutService = require("../services/layout.service");

const saveLayout = asyncHandler(async (req, res) => {
  const { dashboardId, widgets } = req.body;

  if (!dashboardId || !Number.isInteger(Number(dashboardId))) {
    throw new ApiError(400, "Valid dashboardId is required");
  }
  if (!Array.isArray(widgets)) {
    throw new ApiError(400, "widgets must be an array");
  }

  const saved = await layoutService.saveLayout(Number(dashboardId), widgets);
  new ApiResponse(200, saved, "Layout saved successfully").send(res, 200);
});

const getLayout = asyncHandler(async (req, res) => {
  const dashboardId = Number(req.params.dashboardId);
  if (!Number.isInteger(dashboardId)) throw new ApiError(400, "Invalid dashboard id");

  const widgets = await layoutService.getLayout(dashboardId);
  new ApiResponse(200, widgets, "Layout fetched successfully").send(res, 200);
});

module.exports = { saveLayout, getLayout };
