const router = require("express").Router();
const playerRoutes = require("./player");
const houseRoutes = require("./house");
const scoreRoutes = require("./score");

// Score routes
router.use("/player", playerRoutes);

// house routes
router.use("/house", houseRoutes);

// house routes
router.use("/score", scoreRoutes);

module.exports = router;
