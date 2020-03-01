const express = require("express");
const router = express.Router();
const authAdminController = require('../controllers/authentificationAdminController');

// Admin authentification, if everything is going well, send back token.

router.post("/", authAdminController.postAuthAdmin);

module.exports = router;
