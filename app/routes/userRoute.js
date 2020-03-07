const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const userController = require("../controllers/userController");

// Users access get and put routes to their data only with token.

router.get("/me", userController.getSelf);

router.put("/me", userController.putSelf);

// User inscription

router.post("/", userController.postInscription);

// Only the admins can get or update in all the users ! The jwtverify middleware comes to ensure that the client is an admin.

router.get("/", jwtverify, userController.getAllUsers);

router.get("/:id", [objectvalid, jwtverify], userController.getUserById);

router.put("/:id", [objectvalid, jwtverify], userController.putUserById);

// Only the superadmin can delete users

router.delete("/:id", objectvalid, userController.deleteUserById);

module.exports = router;
