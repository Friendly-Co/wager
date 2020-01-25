const router = require("express").Router();
const houseController = require("../../controllers/houseController");
const sendEmailController = require("../../controllers/sendEmailController");

// Matches with "/api/admin/login/:adminName"
router
  .route("/:Id")
  // .route("/login")
  .get(houseController.findById)

  .post(houseController.create)
  .put(houseController.update);

// Matches with "/api/admin/mail"
// router.route("/:mail").post(sendEmailController.create);
router.route("/mail/moremail").post(sendEmailController.create);

// Matches with "/api/admin"
router
  .route("/")
  .get(houseController.findAll)
  .delete(houseController.removeAll);

module.exports = router;
