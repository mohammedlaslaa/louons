const {
  Address,
  schemaValidationAddress,
  schemaPutValidationAddress
} = require("../models/addressModel");

exports.getAllAddresses = async (req, res) => {
  try {
    const address = await Address.find();
    return res.send(address);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllSelfAddresses = async (req, res) => {
  try {
    if (res.locals.owner.adminLevel)
      return res
        .status(400)
        .send({ error: true, message: "An admin do not have address" });

    const selfaddress = await Address.findOne({ id_user: res.locals.owner.id });

    if (!selfaddress)
      return res
        .status(200)
        .send({ error: true, message: "Empty list, not address found" });
    return res.send(selfaddress);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const address = res.locals.owner.adminLevel
      ? await Address.findOne({
          _id: req.params.id
        })
      : await Address.findOne({
          _id: req.params.id,
          id_user: res.locals.owner.id
        });
    if (!address)
      return res
        .status(200)
        .send({ error: true, message: "Empty list, not address found" });

    return res.send(address);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putAddressById = async (req, res) => {
  const { error } = schemaPutValidationAddress.validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const isOwner = await Address.findOne({
      _id: req.params.id,
      id_user: res.locals.owner.id
    });

    if (!isOwner && !res.locals.owner.adminLevel)
      return res.status(200).send({
        error: true,
        message:
          "Empty list, you are not the owner of the address or you do not have admin rights"
      });

    const isTitleExist = await Address.findOne({
      title: {'$regex': req.body.title, $options:'i'},
      id_user: res.locals.owner.id
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating address title" });

    await Address.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    return res.send({
      error: false,
      modified: true,
      message: "Address modified with success"
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAddressById = async (req, res) => {
  try {
    const isOwner = await Address.findOne({
      _id: req.params.id,
      id_user: res.locals.owner.id
    });

    if (!isOwner && !res.locals.owner.adminLevel)
      return res.status(200).send({
        error: true,
        message:
          "Empty list, you are not the owner of the address or you do not have admin rights"
      });

    const address = await Address.findByIdAndRemove(req.params.id);
    if (!address)
      return res
        .status(400)
        .send({ message: "There are not address to delete" });

    return res.send({
      error: false,
      modified: true,
      message: "Address deleted with success"
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postAddress = async (req, res) => {
  const { error } = schemaValidationAddress.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    let ownerId = res.locals.owner.adminLevel
      ? req.body.id_user
      : res.locals.owner.id;

    const isTitleExist = await Address.findOne({
      title: {'$regex': req.body.title, $options:'i'},
      id_user: ownerId
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating address title" });

    const maxId = await Address.find()
      .sort({ addressId: -1 })
      .limit(1)
      .select("addressId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].addressId + 1);

    const address = new Address({
      addressId: valueId,
      id_user: ownerId,
      title: req.body.title,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      country: req.body.country
    });

    await address.save();

    return res.status(200).send({ message: "Address added with success" });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
