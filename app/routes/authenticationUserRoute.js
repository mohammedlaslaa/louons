const express = require("express");
const router = express.Router();
const isemptybody = require("../middleware/isEmptyBody");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const authUserController = require("../controllers/authenticationUserController");

// User authentification, if everything is going well, send back token.

router.post("/", isemptybody, authUserController.postAuthUser);

// cookie authentication verification route

router.get("/", ifexistadminuser, authUserController.getIsAuthUser);

module.exports = router;
