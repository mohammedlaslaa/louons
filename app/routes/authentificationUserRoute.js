const express = require("express");
const router = express.Router();
const isemptybody = require("../middleware/isEmptyBody");
const authUserController = require("../controllers/authentificationUserController");

// User authentification, if everything is going well, send back token.

router.post("/", isemptybody, authUserController.postAuthUser);

module.exports = router;
