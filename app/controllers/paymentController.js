const {
  Payment,
  schemaValidationPayment,
  schemaPutValidationPayment
} = require("../models/paymentModel");

exports.getAllPayment = async function(req, res) {
  try {
    const allPayment = await Payment.find();
    return res.send(allPayment);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getPaymentById = async function(req, res) {
  try {
    const payment = await Payment.findById(req.params.id).select(
      "id_admin title description path_picture"
    );

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    return res.send(payment);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postPayment = async function(req, res) {
  const { error } = schemaValidationPayment.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const maxId = await Payment.find()
      .sort({ paymentId: -1 })
      .limit(1)
      .select("paymentId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].paymentId + 1);

    const isTitleExist = await Payment.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating payment title" });

    const payment = new Payment({
      id_admin: res.locals.admin.id,
      carrierId: valueId,
      title: req.body.title,
      description: req.body.description,
      path_picture: req.body.path_picture
    });

    await payment.save();

    return res.status(201).send(`The payment has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putPaymentById = async function(req, res) {
  const { error } = schemaPutValidationPayment.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.id_admin)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify admin ID"
      });

    const isTitleExist = await Payment.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating payment title or no change detected"
      });

    let payment = await Payment.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    await payment.save();

    return res.status(201).send(`The payment has been modified`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deletePaymentById = async function(req, res) {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment)
      return res.status(400).send({
        error: true,
        message: "There are not payment with the id provided"
      });

    return res.send({
      error: false,
      message: `The ${payment.title} has been removed`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
