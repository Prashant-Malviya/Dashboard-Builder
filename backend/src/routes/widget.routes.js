const express = require("express");
const router = express.Router();
const {
  createWidget,
  updateWidget,
  deleteWidget,
  duplicateWidget,
} = require("../controllers/widget.controller");

router.post("/", createWidget);
router.put("/:id", updateWidget);
router.delete("/:id", deleteWidget);
router.post("/:id/duplicate", duplicateWidget);

module.exports = router;
