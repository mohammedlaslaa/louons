const jwt = require("jsonwebtoken");
const {
  Admin,
  schemaValidationAdmin,
  schemaPutValidationAdmin
} = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.getSelf = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );
    const admin = await Admin.findById(verify.id);
    if (!admin)
      return res.status(400).send({ error: true, message: "Bad request !" });
    return res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putSelf = async (req, res) => {
  if (Object.keys(req.body).length == 0) {
    return res.status(204).send({ message: "There are nothing to update" });
  }

  const { error } = schemaPutValidationAdmin.validate(req.body);
  if (error) return res.status(400).send(error.message);

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

    await Admin.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now()
    });

    const admin = await Admin.findById(verify.id);
    if (!admin)
      return res.status(400).send({ error: true, message: "Bad request !" });

    return res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const admin = await Admin.find();
    return res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postNewAdmin = async (req, res) => {
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
};

exports.getAdminById = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not admin with the id provided"
      });

    res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putAdminById = async (req, res) => {
  if (Object.keys(req.body).length == 0) {
    return res.status(204).send({ message: "There are nothing to update" });
  }

  const { error } = schemaPutValidationAdmin.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

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

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    await Admin.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    const admin = await Admin.findById(req.params.id);
    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not admin with the id provided"
      });

    return res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    const verify = jwt.verify(
      req.header("x-auth-token"),
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin")
      return res.status(401).send({ error: true, message: "Not authorized !" });

    const admin = await Admin.findByIdAndRemove(req.params.id);
    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not admin with the id provided"
      });

    return res.send(`Admin ${admin.lastName} has been removed with success !`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
