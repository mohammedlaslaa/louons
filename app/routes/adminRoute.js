const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const adminController = require("../controllers/adminController");

// Get and put self to the admin. The admin can not delete itself. However, he will can update the isactive field and send a delete request by mail to the superadmin.

router.get("/me", adminController.getSelf);
router.put("/me", adminController.putSelf);

// Send get all admins, post, put and delete one admin by id. Only the superadmin can access to this route.

router.get("/", adminController.getAllAdmins);

router.post("/", adminController.postNewAdmin);

router.get("/:id", objectvalid, adminController.getAdminById);

router.put("/:id", objectvalid, adminController.putAdminById);

router.delete("/:id", objectvalid, adminController.deleteAdminById);


module.exports = router;