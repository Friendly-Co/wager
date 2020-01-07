const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/scores"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/scores/:id" this is the id of the player
router
  .route("/:id")
  .get(scoresController.findById)
  .put(scoresController.update);
// .delete(scoresController.remove);

module.exports = router;
