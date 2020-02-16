const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtverify");
const { Admin, schemaValidationAdmin } = require("../models/adminModel");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });
      
    const admin = await Admin.find();
    res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = schemaValidationAdmin.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const hashPwd = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );

    const maxId = await Admin.find()
      .sort({ adminId: -1 })
      .limit(1)
      .select("adminId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].adminId + 1);

    const admin = new Admin({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPwd,
      adminLevel: req.body.adminLevel,
      adminId: valueId
    });

    await admin.save();

    return res.status(201).send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.put("/:id", objectvalid, async (req, res) => {});

module.exports = router;
