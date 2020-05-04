const express = require("express");
const router = express.Router();
const objectvalid = require("../middleware/objectIdValid");
const jwtverify = require("../middleware/jwtVerify");
const ifexistadminuser = require("../middleware/ifExistAdminUser");
const isemptybody = require("../middleware/isEmptyBody");
const addresscontroller = require("../controllers/addressController");

// Get all addresses, only an admin or a superadmin can access this route.

router.get("/", jwtverify, addresscontroller.getAllAddresses);

// Get all addresses registered by one user. One user can get allself addresses. If the request not comes by the owner or an admin or a superadmin, it will be rejected.

router.get("/allself", ifexistadminuser, addresscontroller.getAllSelfAddresses);

// Get, put and delete an address by id. If the request not comes by the owner or an admin or a superadmin, it will be rejected.

router.get(
  "/detail/:id",
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

// Post an address. To make this operation, the request have to be sended by an admin or a superadmin or a owner valid.

router.post(
  "/",
  [isemptybody, ifexistadminuser],
  addresscontroller.postAddress
);

module.exports = router;
