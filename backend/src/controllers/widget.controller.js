const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const widgetService = require("../services/widget.service");

const VALID_TYPES = ["text", "image", "chart"];

const createWidget = asyncHandler(async (req, res) => {
  const { dashboardId, type, x, y, width, height, content } = req.body;

  if (!dashboardId || !Number.isInteger(Number(dashboardId))) {
    throw new ApiError(400, "Valid dashboardId is required");
  }
  if (!VALID_TYPES.includes(type)) {
    throw new ApiError(400, `type must be one of: ${VALID_TYPES.join(", ")}`);
  }

  const widget = await widgetService.createWidget({
    dashboardId: Number(dashboardId),
    type,
    x: x ?? 0,
    y: y ?? 0,
    width: width ?? 300,
    height: height ?? 200,
    content: content ?? {},
  });

  new ApiResponse(201, widget, "Widget created successfully").send(res, 201);
});

const updateWidget = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new ApiError(400, "Invalid widget id");

  const widget = await widgetService.updateWidget(id, req.body);
  new ApiResponse(200, widget, "Widget updated successfully").send(res, 200);
});

const deleteWidget = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new ApiError(400, "Invalid widget id");

  await widgetService.deleteWidget(id);
  new ApiResponse(200, null, "Widget deleted successfully").send(res, 200);
});

const duplicateWidget = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new ApiError(400, "Invalid widget id");

  const widget = await widgetService.duplicateWidget(id);
  new ApiResponse(201, widget, "Widget duplicated successfully").send(res, 201);
});

module.exports = { createWidget, updateWidget, deleteWidget, duplicateWidget };
