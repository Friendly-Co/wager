const router = require("express").Router();
const houseController = require("../../controllers/houseController");
const sendEmailController = require("../../controllers/sendEmailController");

// Matches with "/api/house/:adminName"
router
  .route("/:gameInfo")
  .get(houseController.findById)
  .post(houseController.create);

// Matches with "/api/house/mail"
router.route("/mail/moremail").post(sendEmailController.create);

// Matches with "/api/house"
router
  .route("/")
  .get(houseController.findAll)
  .delete(houseController.removeAll);

module.exports = router;
