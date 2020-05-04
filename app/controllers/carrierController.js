const {
  Carrier,
  schemaValidationCarrier,
  schemaPutValidationCarrier,
} = require("../models/carrierModel");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

exports.getAllCarrier = async function (req, res) {
  try {
    let verify = {
      adminLevel: "",
    };
    // Find all the payments, then return them to the client.

    if (Object.keys(req.cookies).length > 0) {
      verify = jwt.verify(req.cookies["x-auth-token"], process.env.PRIVATE_KEY);
    }

    const allCarrier =
      req.params.isactive === "activecarrier"
        ? await Carrier.find({ isActive: true }).select(
            "carrierId isActive delay_delivery title price link"
          )
        : verify.adminLevel == "admin" || verify.adminLevel == "superadmin"
        ? await Carrier.find().select("carrierId description delay_delivery isActive title price link")
        : await Carrier.find({ isActive: true }).select(
            "carrierId isActive delay_delivery title price link"
          );

    return res.status(200).send({
      adminLevel: verify.adminLevel,
      data: allCarrier,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getCarrierById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Find a carrier by id, then return it to the client.

    const carrier = await Carrier.findById(req.params.id).select(
      "title description price delay_delivery path_picture isActive"
    );

    // If there are not carrier with this id return a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided",
      });

    // If there is an existing carrier, send back a 200 response status code with a this carrier.

    return res.send({ error: false, data: carrier });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postCarrier = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // parse the formdata incoming with formidable

    const form = new formidable.IncomingForm();

    let objdata = {};

    const formdata = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        if (Object.keys(files).length == 0) {
          return res.status(400).send({
            error: true,
            message: "File(s) is needed",
          });
        } else if (Object.keys(files).length > 3) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
        }

        // store the fields sended by the client in the objdata*

        objdata = fields;

        // initialize the name of the picture and the path

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
        resolve("done");
      });
    });

    if (formdata === "done") {
      // Validation post carrier.

      const { error } = schemaValidationCarrier.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // Get the max value of carrierId and increment it to the next carrier registered.

      const maxId = await Carrier.find()
        .sort({ carrierId: -1 })
        .limit(1)
        .select("carrierId");

      let valueId;

      // If the maxId does not return a value set the valueId to 1 by default.

      maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].carrierId + 1);

      objdata["id_admin"] = res.locals.admin.id;
      objdata["carrierId"] = valueId;

      // Create a new carrier document.

      const carrier = new Carrier(objdata);

      // If all the checks is passing, save the carrier, then send back a 200 response status code with a successfull message.

      await carrier.save();

      return res
        .status(201)
        .send({ error: false, message: `The carrier has been created` });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putCarrierById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Check if the carrier is existing and update.

    let carrier = await Carrier.findOne({ _id: req.params.id });

    // If there is not carrier with the id provided, send back a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided",
      });

    // this condition will be triggerred only when the user would activate or desactivate one payment

    if (Object.keys(req.body).length !== 0 && Object.keys(req.body.isActive)) {
      // Update the isactive, then, send back a 200 response status code with succesfull message.

      carrier = await Carrier.findByIdAndUpdate(req.params.id, {
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

        if (Object.keys(files).length === 1) {
          const path = `${process.env.UPLOAD_IMG_PATH}/${carrier.path_picture}`;
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          // initialize the name of the picture and the path

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
      // Validation put carrier.

      const { error } = schemaPutValidationCarrier.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // If req.body.id_admin is sent, return a 400 response status sode with a message.

      if (objdata.id_admin)
        return res.status(400).send({
          error: true,
          message: "Error your are not authorized to modify admin ID",
        });

      // update the payment.

      carrier = await Carrier.findByIdAndUpdate(req.params.id, {
        $set: objdata,
        date_update: Date.now(),
      });

      // If all the checks is passing, send back a 200 response status code with succesfull message.

      return res.status(200).send({
        error: false,
        message: `The carrier has been modified`,
        picture: objdata.path_picture,
      });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteCarrierById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Check if a carrier exist and delete.

    const carrier = await Carrier.findByIdAndDelete(req.params.id);

    // If there is not carrier with the id provided, send back a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided",
      });

    // delete the picture associated with the payment

    const path = `${process.env.UPLOAD_IMG_PATH}/${carrier.path_picture}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // If all the checks is passing, delete the carrier, then send back a 200 response status code with succesfull message.

    return res.send({
      message: `The ${carrier.title} has been removed`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
