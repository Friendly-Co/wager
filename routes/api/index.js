const router = require("express").Router();
const scoreRoutes = require("./scores");
const houseRoutes = require("./house");

// Score routes
router.use("/scores", scoreRoutes);

// house routes
router.use("/house", houseRoutes);

module.exports = router;
