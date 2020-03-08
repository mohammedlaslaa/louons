const jwt = require("jsonwebtoken");
const {
  Admin,
  schemaValidationAdmin,
  schemaPutValidationAdmin
} = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.getSelf = async (req, res) => {
  try {
    return res.send(res.locals.admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putSelf = async (req, res) => {
  const { error } = schemaPutValidationAdmin.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
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

    console.log(verify)
    if (verify.adminLevel !== "superadmin" && req.body.adminLevel)
      return res.status(400).send({
        error: true,
        message: "Only the superadmin can do this action"
      });

    let admin = await Admin.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!admin)
      return res.status(401).send({
        error: true,
        message: "Not Authorized"
      });

    return res.send({
      error: false,
      modified: true,
      message: "Modified with success"
    });
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

    if (!verify.adminLevel || verify.adminLevel !== "superadmin")
      return res
        .status(401)
        .send({ error: true, message: "Not authorized admin level" });

    let admin = await Admin.findById(verify.id);
    if (!admin)
      return res.status(401).send({ error: true, message: "Not authorized" });

    admin = await Admin.find();
    if (!admin)
      return res.status(200).send({ error: true, message: "Bad request" });

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

    admin = new Admin({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPwd,
      adminLevel: req.body.adminLevel,
      adminId: valueId
    });

    await admin.save();

    return res
      .status(201)
      .send(`The ${admin.lastName} admin count has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    admin = await Admin.findById(req.params.id);
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

exports.putAdminById = async (req, res) => {
  const { error } = schemaPutValidationAdmin.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    await Admin.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    return res.send({
      error: false,
      modified: true,
      message: "Modified with success"
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    if (req.params.id == res.locals.verify.id)
      return res.status(400).send({
        error: true,
        message: "You can not delete yourself, please contact support"
      });

    admin = await Admin.findByIdAndRemove(req.params.id);
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
