const router = require("express").Router();
const playerRoutes = require("./player");
const houseRoutes = require("./house");

// Score routes
router.use("/player", playerRoutes);

// house routes
router.use("/house", houseRoutes);

module.exports = router;
