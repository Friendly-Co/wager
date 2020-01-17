const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/scores"
router
  .route("/")
  .get(scoresController.findAll)
  .post(scoresController.create)
  .put(scoresController.update)
  .delete(scoresController.removeAll);

// Matches with "/api/scores/:id" this is the id of the player
router.route("/:id").get(scoresController.findById);
// .put(scoresController.update);
// .delete(scoresController.remove);

router
  .route("/score/:playerName")
  .get(scoresController.findByName)
  .put(scoresController.update);

module.exports = router;
