const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const objectvalid = require("../middleware/objectidvalid");
const jwtverify = require("../middleware/jwtverify");
const moment = require("moment");
const {
  Customer,
  schemaValidationCustomer,
  schemaPutValidationCustomer
} = require("../models/customerModel");
const bcrypt = require("bcrypt");

// customer access with token !

router.get("/me", async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );
    const customer = await Customer.findById(verify.id);
    if (!customer)
      return res.status(400).send({ error: true, message: "Bad request !" });
    res.send(customer);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = schemaValidationCustomer.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const hashPwd = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );

    const maxId = await Customer.find()
      .sort({ clientId: -1 })
      .limit(1)
      .select("clientId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].clientId + 1);

    const customer = new Customer({
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

    await customer.save();

    return res
      .status(201)
      .header("x-auth-token", customer.generateToken())
      .send(customer);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

// Only the admins can CRUD in all the customers !

router.get("/", jwtverify, async (req, res) => {
  try {
    const allCustomers = await Customer.find();
    res.send(allCustomers);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.get("/:id", [objectvalid, jwtverify], async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select(
      "clientId firstName lastName email dateBirth"
    );
    return res.send(customer);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.put("/:id", [objectvalid, jwtverify], async (req, res) => {
  const { error } = schemaPutValidationCustomer.validate(req.body);
  if (error) return res.status(400).send(error.message);
  if (req.body.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
  }

  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(400).send({ error: true, message: "Bad request Id" });
    return res.send(customer);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

router.delete("/:id", objectvalid, async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res
        .status(400)
        .send({ message: "There are not customer with the id provided" });
    return res.send(
      `Customer ${customer.lastName} has been removed with success !`
    );
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
});

module.exports = router;
