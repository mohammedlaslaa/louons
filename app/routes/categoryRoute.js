const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const categoryController = require("../controllers/categoryController");

// Only the admin can get, post or update a category.

router.get("/",  jwtverify, categoryController.getAllCategory);

router.post("/", [isemptybody, jwtverify], categoryController.postCategory);

router.get("/:id", [objectvalid, jwtverify], categoryController.getCategoryById);

router.put("/:id", [isemptybody, objectvalid, jwtverify], categoryController.putCategoryById);

// Only the superadmin can delete a category.

router.delete("/:id", [objectvalid, jwtsuperadmin], categoryController.deleteCategoryById);

module.exports = router;
