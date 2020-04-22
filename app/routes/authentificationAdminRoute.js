const express = require("express");
const router = express.Router();
const isemptybody = require("../middleware/isEmptyBody");
const authAdminController = require("../controllers/authentificationAdminController");

// Admin authentification, if everything is going well, send back token.

router.post("/", isemptybody, authAdminController.postAuthAdmin);


// Route test to get the cookie, this route will be disabled in devlopment environment

router.get("/", authAdminController.getAdmin);

// cookie authentication verification route

router.get("/", authAdminController.getAdmin);

module.exports = router;
