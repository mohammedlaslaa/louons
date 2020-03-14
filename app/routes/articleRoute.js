const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const articleController = require("../controllers/articleController");

// Get article or article by id.

router.get("/", articleController.getAllArticle);

router.get("/:id", objectvalid, articleController.getArticleById);

// Only an user or an admin authenticated can post a new article or put an article by id

router.post(
  "/",
  [isemptybody, ifexistadminuser],
  articleController.postArticle
);

router.put(
  "/:id",
  [objectvalid, isemptybody, ifexistadminuser],
  articleController.putArticleById
);

// Only the superadmin can delete one article, but the user can desactivate his article by update if he want

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  articleController.deleteArticleById
);

module.exports = router;
