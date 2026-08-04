const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const dashboardService = require("../services/dashboard.service");

const createDashboard = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    throw new ApiError(400, "Dashboard name is required");
  }

  const dashboard = await dashboardService.createDashboard(name.trim());
  new ApiResponse(201, dashboard, "Dashboard created successfully").send(res, 201);
});

const listDashboards = asyncHandler(async (req, res) => {
  const dashboards = await dashboardService.listDashboards();
  new ApiResponse(200, dashboards, "Dashboards fetched successfully").send(res, 200);
});

const getDashboard = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new ApiError(400, "Invalid dashboard id");

  const dashboard = await dashboardService.getDashboardById(id);
  new ApiResponse(200, dashboard, "Dashboard fetched successfully").send(res, 200);
});

const deleteDashboard = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new ApiError(400, "Invalid dashboard id");

  await dashboardService.deleteDashboard(id);
  new ApiResponse(200, null, "Dashboard deleted successfully").send(res, 200);
});

module.exports = { createDashboard, listDashboards, getDashboard, deleteDashboard };
