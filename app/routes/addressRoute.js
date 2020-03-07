const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const addresscontroller = require("../controllers/addressController");

// Get all addresses, only the admin can access this route

router.get("/", jwtverify, addresscontroller.getAllAddresses);

// Get all addresses registered by one user

router.get("/allself", ifexistadminuser, addresscontroller.getAllSelfAddresses);

// Get, put and delete an address by id

router.get("/:id", ifexistadminuser, addresscontroller.getAddressById);

router.put("/:id", ifexistadminuser, addresscontroller.putAddressById);

router.delete("/:id", ifexistadminuser, addresscontroller.deleteAddressById);

// Post an address

router.post("/", ifexistadminuser, addresscontroller.postAddress);

module.exports = router;
