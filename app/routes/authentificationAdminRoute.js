const express = require("express");
const router = express.Router();
const isemptybody = require("../middleware/isEmptyBody");
const authAdminController = require("../controllers/authentificationAdminController");

// Admin authentification, if everything is going well, send back token.

router.post("/", isemptybody, authAdminController.postAuthAdmin);

module.exports = router;
