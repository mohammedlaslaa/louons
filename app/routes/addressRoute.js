const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtverify");
const addresscontroller = require("../controllers/addressController");

// Get all addresses, only the admin can access this route

router.get("/", addresscontroller.getAllAddress);

// Get all addresses registered by one user

router.get("/allself", addresscontroller.getAllSelfAddresses);

// Get, put and delete an address by id

router.get("/:id", addresscontroller.getAddressById);

router.put("/:id", addresscontroller.putAddressById);

router.delete("/:id", addresscontroller.deleteAddressById);

// Post an address

router.post("/", addresscontroller.postAddress);

module.exports = router;
