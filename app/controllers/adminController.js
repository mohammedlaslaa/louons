const jwt = require("jsonwebtoken");
const {
  Admin,
  schemaValidationAdmin,
  schemaPutValidationAdmin,
} = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.getSelf = async (req, res) => {
  try {
    // The res.locals.admin comes from the jwtverify middleware (It ensure that the client is an existing admin with his token). It return the admin.

    // Then return this res.lacals.admin to the client.

    return res.status(200).send(res.locals.admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putSelf = async (req, res) => {
  try {
    // Validation put admin.

    const { error } = schemaPutValidationAdmin.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If the request contains a password, hash this.

    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    // Only the superadmin can update the adminlevel.

    const verify = jwt.verify(
      req.cookies["x-auth-token"],
      process.env.PRIVATE_KEY
    );

    if (verify.adminLevel !== "superadmin" && req.body.adminLevel)
      return res.status(400).send({
        error: true,
        message: "Only the superadmin can do this action",
      });

    // Check if an admin exist and update.

    let admin = await Admin.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    // If not admin find, return a 401 response status code.

    if (!admin)
      return res.status(401).send({
        error: true,
        message: "Not Authorized",
      });

    // If all the checks is passing, return a 200 response status code with a successfull message.

    return res.send({
      modified: true,
      message: "Modified with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {

    // Only the superadmin can perform this action.

    let admin = await Admin.find();

    // If the request fail, return a 400 response status code with a message.

    if (!admin)
      return res.status(400).send({ error: true, message: "Bad request" });

    // If all the checks is passing, return a 200 response status code with all admins.

    return res.status(200).send({adminLevel : res.locals.verify.adminLevel, data : admin});
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postNewAdmin = async (req, res) => {
  try {
    // Only the superadmin can perform this action.
    // Validation post admin.

    const { error } = schemaValidationAdmin.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Hash the password send by the client.

    const hashPwd = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );

    // Get the max value of adminId and increment it to the next admin registered.

    const maxId = await Admin.find()
      .sort({ adminId: -1 })
      .limit(1)
      .select("adminId");

    let valueId;

    // If the maxId does not return a value set the valueId to 1 by default.

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].adminId + 1);

    // Create a new admin document.

    admin = new Admin({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPwd,
      adminLevel: req.body.adminLevel,
      adminId: valueId,
    });

    // If all the checks is passing, save the admin, then send back a 200 response status code with a successfull message.

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
    // Only the superadmin can perform this action.

    // Check if there are an existing admin with the req.params.id provided by the client.
    let admin = await Admin.findById(req.params.id);

    // If there are not admin find, send a 400 response status code with a message.
    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not admin with the id provided",
      });

    // If all the checks is passing, return the admin, with a 200 response status code.

    return res.send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putAdminById = async (req, res) => {
  try {
    // Only the superadmin can perform this action.

    // Validation put admin.

    const { error } = schemaPutValidationAdmin.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If the request contains a password, hash this.

    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    // Check if an admin exist and update.

    await Admin.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send({
      modified: true,
      message: "Modified with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    // Only the superadmin can perform this action.

    // Check if an admin exist.

    let admin = await Admin.findOne({ _id: req.params.id });

    // If there are not admin find, send a 400 response status code with a message.

    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not admin with the id provided",
      });
    // Check if the req.params.id == res.locals.verify.id, and if there are the same return a 400 response status code.
    if (
      req.params.id == res.locals.verify.id &&
      admin.adminLevel == "superadmin"
    )
      return res.status(400).send({
        error: true,
        message:
          "You can not delete yourself or delete a superadmin, please contact support",
      });

    // Check if an admin exist and update.

    admin = await Admin.findByIdAndRemove(req.params.id);

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send(`Admin ${admin.lastName} has been removed with success !`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
