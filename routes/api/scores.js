const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

router
  .route("/score/:playerName")
  .get(scoresController.findByName)
  .put(scoresController.update);

// Matches with "/api/scores/:id" this is the id of the player
router.route("/:id").get(scoresController.findById);
// .delete(scoresController.remove);

// Matches with "/api/scores"
router
  .route("/")
  .get(scoresController.findAll)
  .post(scoresController.create)
  .put(scoresController.update)
  .delete(scoresController.removeAll);

module.exports = router;
