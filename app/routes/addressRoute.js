const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const isemptybody = require("../middleware/isEmptyBody");
const addresscontroller = require("../controllers/addressController");

// Get all addresses, only the admin can access this route

router.get("/", jwtverify, addresscontroller.getAllAddresses);

// Get all addresses registered by one user

router.get("/allself", ifexistadminuser, addresscontroller.getAllSelfAddresses);

// Get, put and delete an address by id

router.get(
  "/:id",
  [objectvalid, ifexistadminuser],
  addresscontroller.getAddressById
);

router.put(
  "/:id",
  [isemptybody, objectvalid, ifexistadminuser],
  addresscontroller.putAddressById
);

router.delete(
  "/:id",
  [objectvalid, ifexistadminuser],
  addresscontroller.deleteAddressById
);

// Post an address

router.post("/", [isemptybody, ifexistadminuser], addresscontroller.postAddress);

module.exports = router;
