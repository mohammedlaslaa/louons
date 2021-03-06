const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const categoryController = require("../controllers/categoryController");

// Get all category, this route is available for everyone.

router.get("/all/:isactive?", categoryController.getAllCategory);

// Only the admin can get category by id, post or update a category by id.

router.get(
  "/detail/:id?",
  objectvalid,
  categoryController.getCategoryById
);

router.post("/", [isemptybody, jwtverify], categoryController.postCategory);

router.put(
  "/:id",
  [isemptybody, objectvalid, jwtverify],
  categoryController.putCategoryById
);

// Only the superadmin can delete a category.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  categoryController.deleteCategoryById
);

module.exports = router;
