const jwt = require("jsonwebtoken");
const {
  Address,
  schemaValidationAddress,
  schemaPutValidationAddress
} = require("../models/addressModel");
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
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
