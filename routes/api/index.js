const router = require("express").Router();
const scoreRoutes = require("./scores");

// Score routes
router.use("/scores", scoreRoutes);

module.exports = router;
