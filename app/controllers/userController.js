const jwt = require("jsonwebtoken");
const {
  User,
  schemaValidationUser,
  schemaPutValidationUser,
} = require("../models/userModel");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

exports.getSelf = async (req, res) => {
  try {
    // The res.locals.owner comes from the jwtverify middleware (It ensure that the client is an existing user with his token). It return the user.

    // Then return this res.lacals.owner to the client.

    return res.send(res.locals.owner);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putSelf = async (req, res) => {
  try {
    // Validation put user.

    const { error } = schemaPutValidationUser.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If the request contains a password, hash this.

    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT)
      );
    }

    const verify = jwt.verify(
      req.cookies["x-auth-token"],
      process.env.PRIVATE_KEY
    );
    // Check if an user exist and update.

    const user = await User.findByIdAndUpdate(verify.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    // If not user find, return a 401 response status code.

    if (!user)
      return res.status(401).send({ error: true, message: "Not Authorized" });

    // If all the checks is passing, return a 200 response status code with a successfull message.

    return res.send({
      modified: true,
      message: "Modified with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postInscription = async (req, res) => {
  try {
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
      console.log(objdata);

      // Validation post inscription user.

      const { error } = schemaValidationUser.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // Hash the password send by the client.

      const hashPwd = await bcrypt.hash(
        objdata.password,
        parseInt(process.env.SALT)
      );

      // Get the max value of userId and increment it to the next user registered.

      const maxId = await User.find()
        .sort({ clientId: -1 })
        .limit(1)
        .select("clientId");

      let valueId;

      // If the maxId does not return a value set the valueId to 1 by default.

      maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].clientId + 1);

      objdata["password"] = hashPwd;
      objdata["clientId"] = valueId;

      // Create a new user document.

      const user = new User(objdata);

      // If all the checks is passing, save the user, then send back a 200 response status code with a successfull message and a token in the header.

      await user.save();

      return res
        .status(201)
        .header("x-auth-token", user.generateToken())
        .send({
          error: false,
          message: `The ${user.lastName} user count has been created`,
        });
    }
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Only an admin can perform this action.

    const allUsers = req.params.searchuser
      ? await User.find({
          isActive: true,
          $or: [
            { firstName: { $regex: req.params.searchuser, $options: "i" } },
            { lastName: { $regex: req.params.searchuser, $options: "i" } },
          ],
        }).select("_id clientId firstName lastName")
      : await User.find().select(
          "-password -email -date_delete -dateBirth -date_update"
        );

    // If the request fail, return a 400 response status code with a message.

    if (!allUsers)
      return res.status(400).send({ error: true, message: "Bad request" });

    // If all the checks is passing, return a 200 response status code with all users.

    return res
      .status(200)
      .send({ adminLevel: res.locals.admin.adminLevel, data: allUsers });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Only an admin can perform this action.

    // Check if there are an existing user with the req.params.id provided by the client.

    const user = await User.findById(req.params.id).select(
      "-clientId -_id -date_update -date_register"
    );

    // If there are not user find, send a 400 response status code with a message.

    if (!user)
      return res.status(400).send({
        error: true,
        message: "There are not user with the id provided",
      });

    // If all the checks is passing, return the user, with a 200 response status code.

    return res.send(user);
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

exports.putUserById = async (req, res) => {
  try {
    // Only an admin can perform this action.

    // Check if an user exist and update.

    let user = await User.findById(req.params.id);

    // If there are not user find, send a 400 response status code with a message.

    if (!user)
      return res.status(400).send({ error: true, message: "Bad request Id" });

    // this condition will be triggerred only when the user would activate or desactivate one admin

    if (Object.keys(req.body).length !== 0 && Object.keys(req.body.isActive)) {
      // Update the isactive, then, send back a 200 response status code with succesfull message.

      await User.findByIdAndUpdate(req.params.id, {
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
          const path = `${process.env.UPLOAD_IMG_PATH}/${user.path_picture}`;
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
      // Validation put user.

      const { error } = schemaPutValidationUser.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // If the request contains a password, hash this.

      if (objdata.password) {
        const passWordData = objdata.password
        objdata.password = await bcrypt.hash(
          passWordData,
          parseInt(process.env.SALT)
        );
      }
      
      await User.findByIdAndUpdate(req.params.id, {
        $set: objdata,
        date_update: Date.now(),
      });

      // If all the checks is passing, return a 200 response status code with a succesfull message.

      return res.send({
        error: false,
        message: "User modified with success",
        picture : objdata.path_picture
      });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    // Only the superadmin can perform this action.

    // Check if an user exist and update.

    const user = await User.findByIdAndRemove(req.params.id);

    // If there are not user find, send a 400 response status code with a message.

    if (!user)
      return res
        .status(400)
        .send({ message: "There are not user with the id provided" });

    // delete the picture associated with the user

    const path = `${process.env.UPLOAD_IMG_PATH}/${user.path_picture}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send({ error: false });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
