const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const adminController = require("../controllers/adminController");

// Get and put self to the admin. The admin can not delete itself. However, he will can update the isactive field and send a delete request by mail to the superadmin.

router.get("/me", jwtverify, adminController.getSelf);

router.put("/me", isemptybody, adminController.putSelf);

// Send get all admins, post an dmin, put an admin by id and delete an admin by id. Only the superadmin can access to this route.

router.get("/", jwtsuperadmin, adminController.getAllAdmins);

router.post("/", jwtsuperadmin, adminController.postNewAdmin);

router.get("/:id", [objectvalid, jwtsuperadmin], adminController.getAdminById);

router.put(
  "/:id",
  [objectvalid, jwtsuperadmin],
  adminController.putAdminById
);

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  adminController.deleteAdminById
);

module.exports = router;
