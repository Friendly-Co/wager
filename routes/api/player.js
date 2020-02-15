const router = require("express").Router();
const playerController = require("../../controllers/playerController");

//may need to change routes to api/player/:playerId/game/:gameId

// find all players
// Matches with "/api/player/:gameInfo"
router
  .route("/")
  .post(playerController.create)
  .put(playerController.update)
  .delete(playerController.removeAll);

// get player scores, or change to kickedOut = true
// Matches with "/api/player/score/:playerId"
router
  .route("/score/:playerId")
  .get(playerController.findById)
  .put(playerController.updateOne);

// Matches with "/api/player/:gameInfo"
//get all players with an associated gameId
router.route("/:gameId").get(playerController.findByName);
// .get(playerController.findAll)
// .delete(playerController.removeAll);

module.exports = router;
