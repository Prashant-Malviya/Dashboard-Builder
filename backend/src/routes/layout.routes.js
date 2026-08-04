const express = require("express");
const router = express.Router();
const { saveLayout, getLayout } = require("../controllers/layout.controller");

router.post("/save", saveLayout);
router.get("/:dashboardId", getLayout);

module.exports = router;
