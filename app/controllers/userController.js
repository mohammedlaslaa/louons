const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  User,
  schemaValidationUser,
  schemaPutValidationUser
} = require("../models/userModel");
const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.getSelf = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    const user = await User.findById(verify.id);
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request" });

    return res.send(user);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putSelf = async (req, res) => {
  if (Object.keys(req.body).length == 0) {
    return res.status(204).send({ message: "There are nothing to update" });
  }

  const { error } = schemaPutValidationUser.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.lastName) req.body.lastName = req.body.lastName;

    if (req.body.firstName) req.body.firstName = req.body.firstName;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    const user = await User.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!user)
      return res.status(400).send({ error: true, message: "Bad request" });

    return res.send({
      error: false,
      modified: true,
      message: "Modified with success"
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postInscription = async (req, res) => {
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
      .send(`The ${user.lastName} user count has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.send(allUsers);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "clientId firstName lastName email dateBirth"
    );

    if (!user)
      return res.status(400).send({
        error: true,
        message: "There are not user with the id provided"
      });

    return res.send(user);
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

exports.putUserById = async (req, res) => {
  if (Object.keys(req.body).length == 0) {
    return res.status(204).send({ message: "There are nothing to update" });
  }

  const { error } = schemaPutValidationUser.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    if (req.body.lastName) req.body.lastName = req.body.lastName;

    if (req.body.firstName) req.body.firstName = req.body.firstName;

    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request Id" });

    return res.send({
      error: false,
      modified: true,
      message: "User modified with success"
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (!verify.adminLevel || verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized" });

    let admin = await Admin.findById(verify.id);

    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not existing admin with the JWT id provided"
      });

    const user = await User.findByIdAndRemove(req.params.id);
    if (!user)
      return res
        .status(400)
        .send({ message: "There are not user with the id provided" });

    return res.send(`User ${user.lastName} has been removed with success`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
