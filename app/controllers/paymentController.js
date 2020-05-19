const {
  Payment,
  schemaValidationPayment,
  schemaPutValidationPayment,
} = require("../models/paymentModel");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const crypto = require("crypto");

exports.getAllPayment = async function (req, res) {
  try {
    let verify = {
      adminLevel: "",
    };
    // Find all the payments, then return them to the client.

    if (Object.keys(req.cookies).length > 0) {
      verify = jwt.verify(req.cookies["x-auth-token"], process.env.PRIVATE_KEY);
    }

    const allPayment =
      req.params.isactive === "activepayment"
        ? await Payment.find({ isActive: true }).select(
            "paymentId isActive title link"
          )
        : verify.adminLevel == "admin" || verify.adminLevel == "superadmin"
        ? await Payment.find().select("paymentId description isActive title link")
        : await Payment.find({ isActive: true }).select(
            "paymentId isActive title link path_picture description"
          );

    return res.status(200).send({
      adminLevel: verify.adminLevel,
      data: allPayment,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getPaymentById = async function (req, res) {
  try {
    // Find a payment by id, then return it to the client.

    const payment = await Payment.findById(req.params.id).select(
      "id_admin title description path_picture isActive"
    );

    // If there are not payment with this id return a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided",
      });

    // If there is an existing payment, send back a 200 response status code with a this payment.

    return res.send({ error: false, data: payment });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postPayment = async function (req, res) {
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
        } else if (Object.keys(files).length > 1) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
        }

        // store the fields sended by the client in the objdata

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
      // Validation post payment.

      const { error } = schemaValidationPayment.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // Get the max value of paymentId and increment it to the next payment registered.

      const maxId = await Payment.find()
        .sort({ paymentId: -1 })
        .limit(1)
        .select("paymentId");

      let valueId;

      // If the maxId does not return a value set the valueId to 1 by default.

      maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].paymentId + 1);

      objdata["carrierId"] = valueId;
      objdata["id_admin"] = res.locals.admin.id;

      // Create a new payment document.

      const payment = new Payment(objdata);

      // If all the checks is passing, save the payment, then send back a 200 response status code with a successfull message.

      await payment.save();

      return res
        .status(201)
        .send({ error: false, message: `The payment has been created` });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putPaymentById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Check if the article is existing.

    let payment = await Payment.findOne({ _id: req.params.id });

    // If there is not article with the id provided, send back a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided",
      });

    // this condition will be triggerred only when the user would activate or desactivate one payment

    if (Object.keys(req.body).length !== 0 && Object.keys(req.body.isActive)) {
      // Update the isactive, then, send back a 200 response status code with succesfull message.

      payment = await Payment.findByIdAndUpdate(req.params.id, {
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
          const path = `${process.env.UPLOAD_IMG_PATH}/${payment.path_picture}`;
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
      // Validation put payment.
      const { error } = schemaPutValidationPayment.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // If req.body.id_admin is sent, return a 400 response status sode with a message.

      if (objdata.id_admin)
        return res.status(400).send({
          error: true,
          message: "Error your are not authorized to modify admin ID",
        });

      // Update the payment.

      payment = await Payment.findByIdAndUpdate(req.params.id, {
        $set: objdata,
        date_update: Date.now(),
      });

      // If there is not payment with the id provided, send back a 400 response status code with a message.

      if (!payment)
        return res.status(400).send({
          error: true,
          message: "There are not payment with the id provided",
        });

      // If all the checks is passing, send back a 200 response status code with succesfull message.

      await payment.save();

      return res.status(200).send({
        error: false,
        message: `The payment has been modified`,
        picture: objdata.path_picture,
      });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deletePaymentById = async function (req, res) {
  try {
    // Only an existing superadmin can perform this action.

    // Check if a payment exist and delete.

    const payment = await Payment.findByIdAndRemove(req.params.id);

    // If there is not payment with the id provided, send back a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided",
      });

    // delete the picture associated with the payment

    const path = `${process.env.UPLOAD_IMG_PATH}/${payment.path_picture}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // If all the checks is passing, delete the payment, then send back a 200 response status code with succesfull message.

    return res.send({
      error: false,
      message: `The ${payment.title} has been removed`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
