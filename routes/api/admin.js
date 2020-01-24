const router = require("express").Router();
const adminController = require("../../controllers/adminController");
const sendEmailController = require("../../controllers/sendEmailController");

// Matches with "/api/admin/login/:adminName"
router
  .route("/:Id")
  // .route("/login")
  .get(adminController.findById)

  .post(adminController.create)
  .put(adminController.update);

// Matches with "/api/admin/mail"
// router.route("/:mail").post(sendEmailController.create);
router.route("/mail/moremail").post(sendEmailController.create);

// Matches with "/api/admin"
router
  .route("/")
  .get(adminController.findAll)
  .delete(adminController.removeAll);

module.exports = router;
