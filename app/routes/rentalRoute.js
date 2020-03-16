const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const ifExistAdminUser = require("../middleware/ifExistAdminUser");
const isemptybody = require("../middleware/isEmptyBody");
const rentalController = require("../controllers/rentalController");

// User can get all his rental.

router.get("/self", ifExistAdminUser, rentalController.getAllMyRental);

// An owner or an admin can get or put a rental by id.

router.get("/:id", [objectvalid, ifExistAdminUser], rentalController.getRentalById);

router.put(
  "/:id",
  [isemptybody, objectvalid, ifExistAdminUser],
  rentalController.putRentalById
);

// Post a rental, only an user or an admin can doing this request.

router.post("/", [isemptybody, ifExistAdminUser], rentalController.postRental);

// Only the admins can get all the rentals ! The jwtverify middleware comes to ensure that the client is an admin.

router.get("/", jwtverify, rentalController.getAllRentals)

// A rental can not to be deleted, but an admin or an user can desactivate it by update the date delete with the delete request.

router.delete("/:id", ifExistAdminUser, rentalController.deleteRentalById)

module.exports = router;
