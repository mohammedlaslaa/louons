const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const carrierController = require("../controllers/carrierController");

// Get all carrier or carrier by id, this route is available for everyone.

router.get("/", carrierController.getAllCarrier);

router.get("/:id", objectvalid, carrierController.getCarrierById);

// Only the admin can, post or update a carrier.

router.post("/", jwtverify, carrierController.postCarrier);

router.put(
  "/:id",
  [objectvalid, jwtverify],
  carrierController.putCarrierById
);

// Only the superadmin can delete a carrier.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  carrierController.deleteCarrierById
);

module.exports = router;
