const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/scores"
router
  .route("/")
  .get(scoresController.findAll)
  .post(scoresController.create)
  .delete(scoresController.removeAll);

// Matches with "/api/scores/:id" this is the id of the player
router
  .route("/:id")
  .get(scoresController.findById)
  .put(scoresController.update)
  .delete(scoresController.remove);

// Matches with "/api/scores/guess/:playerName" this is the id of the player
// router
//   .route("/playerName/:playerName/currentGuess/:currentguess")  //cannot...
//   .put(scoresController.update);

router
  .route("/score/:playerName")
  .get(scoresController.findByName)
  .put(scoresController.update);

module.exports = router;
