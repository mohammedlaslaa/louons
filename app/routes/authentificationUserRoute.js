const express = require("express");
const router = express.Router();
const authUserController = require('../controllers/authentificationUserController');

// User authentification, if everything is going well, send back token.

router.post("/", authUserController.postAuthUser);

module.exports = router;
