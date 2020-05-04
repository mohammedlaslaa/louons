const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const articleController = require("../controllers/articleController");

// Get all article or article by id, this route is available for everyone.

router.get("/:searcharticle?", articleController.getAllArticle);

router.get("/detail/:id", objectvalid, articleController.getArticleById);

// Only an user or an admin authenticated can post a new article or put an article by id.

router.post(
  "/",
  ifexistadminuser,
  articleController.postArticle
);

router.put(
  "/:id",
  [objectvalid, ifexistadminuser],
  articleController.putArticleById
);

// Only the superadmin can delete one article, but the user can desactivate his article by update if he want.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  articleController.deleteArticleById
);

module.exports = router;
