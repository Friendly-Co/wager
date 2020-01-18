const router = require("express").Router();
const adminController = require("../../controllers/adminController");

// Matches with "/api/admin/:adminName"
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
