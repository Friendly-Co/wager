const router = require("express").Router();
const playerController = require("../../controllers/playerController");

//may need to change routes to api/player/:playerId/game/:gameId

// Matches with "/api/player"
router
  .route("/:gameId")
  // find all players
  .get(playerController.findByName)
  .post(playerController.create)
  // .get(playerController.findAll)
  // create a new player- should take in playerName and gameId
  .put(playerController.update)
  .delete(playerController.removeAll);

// Matches with "/api/player/:id" this is the id of the player
// router.route("/:id").get(playerController.findById);
// .delete(playerController.remove);

router
  // .route("/score/:playerName")
  .route("/score/:playerId")
  .get(playerController.findById)
  //get all players with an associated gameId
  // .get(playerController.findByName);
  // .post(playerController.create);
  .put(playerController.updateOne);

module.exports = router;
