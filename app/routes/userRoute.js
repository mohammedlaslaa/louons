const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtverify");
const moment = require("moment");
const userController = require('../controllers/userController');
const {
  User,
  schemaValidationUser,
  schemaPutValidationUser
} = require("../models/userModel");
const bcrypt = require("bcrypt");

// Users access get and put routes to their data only with token.

router.get("/me", async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );
    const user = await User.findById(verify.id);
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request !" });
    res.send(user);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.put("/me", async (req, res) => {})

// User inscription

router.post("/", async (req, res) => {
  const { error } = schemaValidationUser.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const hashPwd = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );

    const maxId = await User.find()
      .sort({ clientId: -1 })
      .limit(1)
      .select("clientId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].clientId + 1);

    const user = new User({
      clientId: valueId,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPwd,
      dateBirth: moment(req.body.dateBirth, "DD-MM-YYYY").format("YYYY-MM-DD"),
      address: req.body.address,
      zipCode: req.body.zipCode,
      country: req.body.country
    });

    await user.save();

    return res
      .status(201)
      .header("x-auth-token", user.generateToken())
      .send(user);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

// Only the admins can CRUD in all the users ! The jwtverify middleware comes to ensure that the client is an admin.

router.get("/", jwtverify, async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.get("/:id", [objectvalid, jwtverify], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "clientId firstName lastName email dateBirth"
    );
    return res.send(user);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.put("/:id", [objectvalid, jwtverify], async (req, res) => {
  const { error } = schemaPutValidationUser.validate(req.body);
  if (error) return res.status(400).send(error.message);
  if (req.body.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
  }

  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request Id" });
    return res.send(user);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

// Only the superadmin can delete users

router.delete("/:id", objectvalid, async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const user = await User.findByIdAndRemove(req.params.id);
    if (!user)
      return res
        .status(400)
        .send({ message: "There are not user with the id provided" });
    return res.send(
      `User ${user.lastName} has been removed with success !`
    );
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

module.exports = router;
