const express = require("express");
const router = express.Router();
const {
  createDashboard,
  listDashboards,
  getDashboard,
  deleteDashboard,
} = require("../controllers/dashboard.controller");

router.post("/", createDashboard);
router.get("/", listDashboards);
router.get("/:id", getDashboard);
router.delete("/:id", deleteDashboard);

module.exports = router;
