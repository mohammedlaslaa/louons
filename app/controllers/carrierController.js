const {
  Carrier,
  schemaValidationCarrier,
  schemaPutValidationCarrier
} = require("../models/carrierModel");

exports.getAllCarrier = async function(req, res) {
  try {
    // Find all the carriers, then return them to the client.

    const allCarrier = await Carrier.find();
    return res.send(allCarrier);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getCarrierById = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Find a carrier by id, then return it to the client.

    const carrier = await Carrier.findById(req.params.id).select(
      "-_id title description price delay_delivery path_picture"
    );

    // If there are not carrier with this id return a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    // If there is an existing carrier, send back a 200 response status code with a this carrier.

    return res.send(carrier);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postCarrier = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation post carrier.
    const { error } = schemaValidationCarrier.validate(req.body);
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

    // Check if the carrier title is already existing.

    const isTitleExist = await Carrier.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" }
    });

    // If the carrier title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating carrier title" });

    // Create a new carrier document.

    const carrier = new Carrier({
      id_admin: res.locals.admin.id,
      carrierId: valueId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      path_picture: req.body.path_picture,
      delay_delivery: req.body.delay_delivery
    });

    // If all the checks is passing, save the carrier, then send back a 200 response status code with a successfull message.

    await carrier.save();

    return res.status(201).send(`The carrier has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putCarrierById = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation put carrier.

    const { error } = schemaPutValidationCarrier.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If req.body.id_admin is sent, return a 400 response status sode with a message.

    if (req.body.id_admin)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify admin ID"
      });

    // Check if the carrier title is already existing.

    const isTitleExist = await Carrier.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" }
    });

    // If the carrier title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating carrier title or no change detected"
      });

    // Check if the carrier is existing and update.

    let carrier = await Carrier.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    // If there is not carrier with the id provided, send back a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    // If all the checks is passing, send back a 200 response status code with succesfull message.

    return res.status(201).send({
      error: false,
      message: `The carrier has been modified`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteCarrierById = async function(req, res) {
  try {
    // Only an existing admin can perform this action.

    // Check if a carrier exist and delete.

    const carrier = await Carrier.findByIdAndDelete(req.params.id);

    // If there is not carrier with the id provided, send back a 400 response status code with a message.

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    // If all the checks is passing, delete the carrier, then send back a 200 response status code with succesfull message.

    return res.send({
      message: `The ${carrier.title} has been removed`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
