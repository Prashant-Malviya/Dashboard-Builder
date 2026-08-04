const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const { errorHandler, notFound } = require("./middlewares/errorHandler");

const dashboardRoutes = require("./routes/dashboard.routes");
const widgetRoutes = require("./routes/widget.routes");
const layoutRoutes = require("./routes/layout.routes");
const imageRoutes = require("./routes/image.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

// --- Global middlewares ---
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- API routes ---
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/widgets", widgetRoutes);
app.use("/api/layouts", layoutRoutes);
app.use("/api/images", imageRoutes);
app.use("/api", healthRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;
