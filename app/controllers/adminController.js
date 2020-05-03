const {
  Admin,
  schemaValidationAdmin,
  schemaPutValidationAdmin,
} = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

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

    return res
      .status(200)
      .send({ adminLevel: res.locals.verify.adminLevel, data: admin });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postNewAdmin = async (req, res) => {
  try {
    // Only the superadmin can perform this action.

    // parse the formdata incoming with formidable

    const form = new formidable.IncomingForm();

    let objdata = {};

    const formdata = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        // store the fields sended by the client in the objdata

        objdata = fields;

        // initialize the name of the picture and the path

        if (Object.keys(files).length === 1) {
          for (const file of Object.entries(files)) {
            const title = file[1].name;
            const ext = title.split(".");
            const random = Math.random().toString();
            const path = `${crypto
              .createHash("sha1")
              .update(ext[0] + random)
              .digest("hex")}.${ext[1]}`;
            objdata["path_picture"] = path;

            fs.rename(
              file[1].path,
              `${process.env.UPLOAD_IMG_PATH}/${path}`,
              (err) => {
                if (err) throw err;
              }
            );
          }
        } else if (Object.keys(files).length > 1) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
        }
        resolve("done");
      });
    });

    if (formdata === "done") {
      // Validation post admin.

      const { error } = schemaValidationAdmin.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // Hash the password send by the client.

      const hashPwd = await bcrypt.hash(
        objdata.password,
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

      objdata["password"] = hashPwd;
      objdata["adminId"] = valueId;

      // Create a new admin document.

      admin = new Admin(objdata);

      // If all the checks is passing, save the admin, then send back a 200 response status code with a successfull message.

      await admin.save();

      return res.status(201).send({
        error: false,
        message: `The ${admin.lastName} admin count has been created`,
      });
    }
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

    // Check if the admin is existing.

    let admin = await Admin.findOne({ _id: req.params.id });

    // If there is not admin with the id provided, send back a 400 response status code with a message.

    if (!admin)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided",
      });

    // this condition will be triggerred only when the user would activate or desactivate one admin

    if (Object.keys(req.body).length !== 0 && Object.keys(req.body.isActive)) {
      // Update the isactive, then, send back a 200 response status code with succesfull message.

      await Admin.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        date_update: Date.now(),
      });

      return res
        .status(200)
        .send({ error: false, message: `The payment has been modified` });
    }

    // parse the formdata incoming with formidable

    const form = new formidable.IncomingForm();

    let objdata = {};

    const formdata = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        // store the fields sended by the client in the objdata

        objdata = fields;

        // initialize the name of the picture and the path

        if (Object.keys(files).length === 1) {
          const path = `${process.env.UPLOAD_IMG_PATH}/${admin.path_picture}`;
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          for (const file of Object.entries(files)) {
            const title = file[1].name;
            const ext = title.split(".");
            const random = Math.random().toString();
            const path = `${crypto
              .createHash("sha1")
              .update(ext[0] + random)
              .digest("hex")}.${ext[1]}`;
            objdata["path_picture"] = path;

            fs.rename(
              file[1].path,
              `${process.env.UPLOAD_IMG_PATH}/${path}`,
              (err) => {
                if (err) throw err;
              }
            );
          }
        } else if (Object.keys(files).length > 1) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
        }
        resolve("done");
      });
    });
    if (formdata === "done") {
      // Validation put admin.

      const { error } = schemaPutValidationAdmin.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // If the request contains a password, hash this.

      if (objdata.password) {
        const passWordData = objdata.password;
        objdata.password = await bcrypt.hash(
          passWordData,
          parseInt(process.env.SALT)
        );
      }

      // Check if an admin exist and update.

      await Admin.findByIdAndUpdate(req.params.id, {
        $set: objdata,
        date_update: Date.now(),
      });

      // If all the checks is passing, return a 200 response status code with a succesfull message.

      return res.send({
        modified: true,
        message: "Modified with success",
        picture: objdata.path_picture,
      });
    }
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

    // delete the picture associated with the admin

    const path = `${process.env.UPLOAD_IMG_PATH}/${admin.path_picture}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send({
      error: false,
      message: `The ${admin.lastName} has been removed with success`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
