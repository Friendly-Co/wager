const router = require("express").Router();
const adminController = require("../../controllers/adminController");
const sendEmailController = require("../../controllers/sendEmailController");

// Matches with "/api/admin/send/email/login/:mail"
router.route("/:mail").post(sendEmailController.create);
// Matches with "/api/admin/login/:adminName"
router
  .route("/:adminName")
  .get(adminController.findByName)

  .post(adminController.create)
  .put(adminController.update);

// Matches with "/api/admin"
router
  .route("/")
  .get(adminController.findAll)
  .delete(adminController.removeAll);

module.exports = router;
