const router = require("express").Router();
const scoreRoutes = require("./scores");
const adminRoutes = require("./admin");

// Score routes
router.use("/scores", scoreRoutes);

// Admin routes
router.use("/admin", adminRoutes);

module.exports = router;
