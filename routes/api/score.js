const router = require("express").Router();
const houseController = require("../../controllers/houseController");
const scoreController = require("../../controllers/scoreController");

// Matches with "/api/score"
// Function for EnMasse Score Calculations
// Req.body is an array of objects, including the correct answer, and player guesses
router
  .route("/")
  .put(scoreController.update)
  .post(scoreController.updateMany);

module.exports = router;
