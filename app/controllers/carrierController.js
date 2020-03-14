const {
  Carrier,
  schemaValidationCarrier,
  schemaPutValidationCarrier
} = require("../models/carrierModel");

exports.getAllCarrier = async function(req, res) {
  try {
    const allCarrier = await Carrier.find();
    return res.send(allCarrier);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getCarrierById = async function(req, res) {
  try {
    const carrier = await Carrier.findById(req.params.id).select(
      "id_admin title description price delay_delivery path_picture"
    );

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    return res.send(carrier);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postCarrier = async function(req, res) {
  const { error } = schemaValidationCarrier.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const maxId = await Carrier.find()
      .sort({ carrierId: -1 })
      .limit(1)
      .select("carrierId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].carrierId + 1);

    const isTitleExist = await Carrier.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating carrier title" });

    const carrier = new Carrier({
      id_admin: res.locals.admin.id,
      carrierId: valueId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      path_picture: req.body.path_picture,
      delay_delivery: req.body.delay_delivery
    });

    await carrier.save();

    return res.status(201).send(`The carrier has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putCarrierById = async function(req, res) {
  const { error } = schemaPutValidationCarrier.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.id_admin)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify admin ID"
      });

    const isTitleExist = await Carrier.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating carrier title or no change detected"
      });

    let carrier = await Carrier.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    await carrier.save();

    return res.status(201).send(`The carrier has been modified`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteCarrierById = async function(req, res) {
  try {
    const carrier = await Carrier.findByIdAndDelete(req.params.id);

    if (!carrier)
      return res.status(400).send({
        error: true,
        message: "There are not carrier with the id provided"
      });

    return res.send({
      error: false,
      message: `The ${carrier.title} has been removed`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
