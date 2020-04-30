const {
  Payment,
  schemaValidationPayment,
  schemaPutValidationPayment
} = require("../models/paymentModel");
const jwt = require("jsonwebtoken");

exports.getAllPayment = async function(req, res) {
  try {
    // Find all the payments, then return them to the client.
    const verify = jwt.verify(
      req.cookies["x-auth-token"],
      process.env.PRIVATE_KEY
    );
    const allPayment = await Payment.find();
    return res.status(200).send({adminLevel : verify.adminLevel, data : allPayment});
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getPaymentById = async function(req, res) {
  try {
    // Find a payment by id, then return it to the client.

    const payment = await Payment.findById(req.params.id).select(
      "id_admin title description path_picture"
    );

    // If there are not payment with this id return a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    // If there is an existing payment, send back a 200 response status code with a this payment.

    return res.send(payment);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postPayment = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation post payment.

    const { error } = schemaValidationPayment.validate(req.body);
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

    // Check if the payment title is already existing.

    const isTitleExist = await Payment.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" }
    });

    // If the payment title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating payment title" });

    // Create a new payment document.

    const payment = new Payment({
      id_admin: res.locals.admin.id,
      carrierId: valueId,
      title: req.body.title,
      description: req.body.description,
      path_picture: req.body.path_picture
    });

    // If all the checks is passing, save the payment, then send back a 200 response status code with a successfull message.

    await payment.save();

    return res.status(201).send(`The payment has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putPaymentById = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation put payment.

    const { error } = schemaPutValidationPayment.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If req.body.id_admin is sent, return a 400 response status sode with a message.

    if (req.body.id_admin)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify admin ID"
      });

    // Check if the payment title is already existing.

    const isTitleExist = await Payment.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" }
    });

    // If the payment title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating payment title or no change detected"
      });

    // Check if the payment is existing and update.

    let payment = await Payment.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    // If there is not payment with the id provided, send back a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    // If all the checks is passing, send back a 200 response status code with succesfull message.

    await payment.save();

    return res.status(200).send({
      error: false,
      message: `The payment has been modified`
    });
  } catch (e) {
    console.log('error')
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deletePaymentById = async function(req, res) {
  try {
    // Only an existing superadmin can perform this action.

    // Check if a payment exist and delete.

    const payment = await Payment.findByIdAndRemove(req.params.id);

    // If there is not payment with the id provided, send back a 400 response status code with a message.

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    // If all the checks is passing, delete the payment, then send back a 200 response status code with succesfull message.

    return res.send({
      error: false,
      message: `The ${payment.title} has been removed`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
