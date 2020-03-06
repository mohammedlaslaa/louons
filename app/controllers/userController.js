const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  User,
  schemaValidationUser,
  schemaPutValidationUser
} = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getSelf = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );
    const user = await User.findById(verify.id);
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request !" });
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
  if (error) return res.status(400).send(error.message);

  if (req.body.lastName)
    req.body.lastName = req.body.lastName.replace(/[0-9]/g, "");

  if (req.body.firstName)
    req.body.firstName = req.body.firstName.replace(/[0-9]/g, "");

  if (req.body.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
  }

  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    await User.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now()
    });

    const user = await User.findById(verify.id);
    if (!user)
      return res.status(400).send({ error: true, message: "Bad request !" });

    return res.send(user);
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
      lastName: req.body.lastName.replace(/[0-9]/g, ""),
      firstName: req.body.firstName.replace(/[0-9]/g, ""),
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
};

exports.getAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
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
        message: "There are not admin with the id provided"
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
  if (error) return res.status(400).send(error.message);

  if (req.body.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
  }

  try {
    if (req.body.lastName)
      req.body.lastName = req.body.lastName.replace(/[0-9]/g, "");

    if (req.body.firstName)
      req.body.firstName = req.body.firstName.replace(/[0-9]/g, "");

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
};

exports.deleteUserById = async (req, res) => {
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
    return res.send(`User ${user.lastName} has been removed with success !`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
