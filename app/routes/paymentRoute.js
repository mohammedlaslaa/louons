const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const paymentController = require("../controllers/paymentController");

// Only the admin can, post or update a payment.

router.get("/", jwtverify, paymentController.getAllPayment);

router.post("/", [isemptybody, jwtverify], paymentController.postPayment);

router.get("/:id", [objectvalid, jwtverify], paymentController.getPaymentById);

router.put(
  "/:id",
  [isemptybody, objectvalid, jwtverify],
  paymentController.putPaymentById
);

// Only the superadmin can delete a payment.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  paymentController.deletePaymentById
);

module.exports = router;
