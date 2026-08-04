const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const prisma = require("../config/db");


router.get("/health", (req, res) => {
  new ApiResponse(200, { uptime: process.uptime() }, "Server is healthy").send(res, 200);
});


router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [dashboardCount, widgetCount] = await Promise.all([
      prisma.dashboard.count(),
      prisma.widget.count(),
    ]);

    new ApiResponse(
      200,
      { dashboards: dashboardCount, widgets: widgetCount },
      "Stats fetched successfully"
    ).send(res, 200);
  })
);

module.exports = router;
