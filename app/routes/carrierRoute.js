const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const carrierController = require("../controllers/carrierController");

// Only the admin can, post or update a carrier.

router.get("/", carrierController.getAllCarrier);

router.post("/", [isemptybody, jwtverify], carrierController.postCarrier);

router.get("/:id", [objectvalid, jwtverify], carrierController.getCarrierById);

router.put(
  "/:id",
  [isemptybody, objectvalid, jwtverify],
  carrierController.putCarrierById
);

// Only the superadmin can delete a carrier.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  carrierController.deleteCarrierById
);

module.exports = router;
