const jwt = require("jsonwebtoken");
const {
  Address,
  schemaValidationAddress,
  schemaPutValidationAddress
} = require("../models/addressModel");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getAllAddress = async (req, res) => {
  try {
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllSelfAddresses = async (req, res) => {
  try {
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putAddressById = async (req, res) => {
  try {
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAddressById = async (req, res) => {
  try {
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postAddress = async (req, res) => {
  try {
    // verify token
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    const user = await User.findById(verify.id);
    if(!user) res.status(404).send({ error : true, message: "There are not user with this id" })

    return res.status(200).send({ jwt: verify });

    // if token exist and id is valid

    // add address with the id of the user
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
