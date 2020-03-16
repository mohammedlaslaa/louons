const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const paymentController = require("../controllers/paymentController");

// Get all payment or payment by id, this route is available for everyone.

router.get("/", paymentController.getAllPayment);

router.get("/:id", objectvalid, paymentController.getPaymentById);

// Only the admin can post or update a payment.

router.post("/", [isemptybody, jwtverify], paymentController.postPayment);

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
