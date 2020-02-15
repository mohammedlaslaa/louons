const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const objectvalid = require("../middleware/objectidvalid");
const moment = require("moment");

const {
  Customer,
  schemaValidationCustomer
} = require("../models/customerModel");
const bcrypt = require("bcrypt");

router.get("/me", async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );
    const customer = await Customer.findById(verify.id);
    res.send(customer);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCustomers = await Customer.find();
    res.send(allCustomers);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = schemaValidationCustomer.validate(req.body);
  if (error) res.status(400).send(error.message);
  try {
    const hashPwd = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
    const customer = new Customer({
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
    res.send(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", objectvalid, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select(
      "firstName lastName email dateBirth"
    );
    res.header("x-auth-token", customer.generateToken()).send(customer);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.put("/:id", objectvalid, async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.delete("/:id", objectvalid, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(`Customer ${customer.lastName} has been removed with success !`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
