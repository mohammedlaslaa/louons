const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const jwtsuperadmin = require("../middleware/jwtSuperAdmin");
const isemptybody = require("../middleware/isEmptyBody");
const paymentController = require("../controllers/paymentController");

// Get all payment, this route is available for everyone.

router.get("/all/:isactive?", paymentController.getAllPayment);

// Get payment by id, this route is available only for an admin.

router.get("/detail/:id", [objectvalid, jwtverify], paymentController.getPaymentById);

// Only the admin can post or update a payment.

router.post("/", jwtverify, paymentController.postPayment);

router.put(
  "/:id",
  [ objectvalid, jwtverify],
  paymentController.putPaymentById
);

// Only the superadmin can delete a payment.

router.delete(
  "/:id",
  [objectvalid, jwtsuperadmin],
  paymentController.deletePaymentById
);

module.exports = router;
