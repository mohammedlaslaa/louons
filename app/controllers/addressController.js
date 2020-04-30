const {
  Address,
  schemaValidationAddress,
  schemaPutValidationAddress,
} = require("../models/addressModel");

exports.getAllAddresses = async (req, res) => {
  try {
    // Find all the addresses, then return them to the client.

    const address = await Address.find().populate(
      "id_user",
      "firstName lastName"
    );

    // If there is an existing address, send back a 200 response status code with a this address.

    return res.status(200).send({ adminLevel: res.locals.admin.adminLevel, data: address });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllSelfAddresses = async (req, res) => {
  try {
    // If the request comes by an admin, return him all the addresses.

    if (res.locals.owner.adminLevel) {
      const allAddress = await Address.find();
      return res.send(allAddress);
    }

    const selfaddress = await Address.find({
      id_user: res.locals.owner.id,
    }).populate("id_user");

    // If the client does not have addresses return a 200 response status code with a message.

    if (!selfaddress)
      return res
        .status(200)
        .send({ error: true, message: "Empty list, not address found" });

    // If there are existing addresses, send back a 200 response status code with all of this addresses.

    return res.send(selfaddress);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    // Send the request depending by the res.locals.owner. Is the owner is an admin or an user.

    const address = res.locals.owner.adminLevel
      ? await Address.findOne({
          _id: req.params.id,
        })
      : await Address.findOne({
          _id: req.params.id,
          id_user: res.locals.owner.id,
        });

    // If there are not address with this id return a 400 response status code with a message.

    if (!address)
      return res
        .status(400)
        .send({ error: true, message: "Empty list, not address found" });

    // If there is an existing address, send back a 200 response status code with a this address.

    return res.send(address);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postAddress = async (req, res) => {
  try {
    // Validation post address.

    const { error } = schemaValidationAddress.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    let ownerId = res.locals.owner.adminLevel
      ? req.body.id_user
      : res.locals.owner.id;

    // Check if the address title is already existing with the id_user provided in the ownerId.

    const isTitleExist = await Address.findOne({
      title: { $regex: req.body.title, $options: "i" },
      id_user: ownerId,
    });

    // If the address title is already existing send a 400 response status code with a message

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating address title" });

    // Get the max value of addressId and increment it to the next address registered

    const maxId = await Address.find()
      .sort({ addressId: -1 })
      .limit(1)
      .select("addressId");

    let valueId;

    // If the maxId does not return a value set the valueId to 1 by default

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].addressId + 1);

    // Create a new address document

    const address = new Address({
      addressId: valueId,
      id_user: ownerId,
      title: req.body.title,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      country: req.body.country,
    });

    // If all the checks is passing, save the address, then send back a 200 response status code with a successfull message.

    await address.save();

    return res.status(201).send({ message: "Address added with success" });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putAddressById = async (req, res) => {
  try {
    // Validation put address.

    const { error } = schemaPutValidationAddress.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    let ownerId = res.locals.owner.adminLevel
      ? req.body.id_user
      : res.locals.owner.id;

    // Check if the client is the owner or the admin can update with the right id_user.

    const isOwner = await Address.findOne({
      _id: req.params.id,
      id_user: ownerId,
    });

    // If the client is not the owner and is not and admin send a 400 response status code with a message.

    if (!isOwner && !res.locals.owner.adminLevel)
      return res.status(400).send({
        error: true,
        message:
          "Empty list, you are not the owner of this address or you do not have admin rights",
      });

    if (req.body.title) {
      // Check if the client is an admin and the id_user is specify.

      if (res.locals.owner.adminLevel && !ownerId) {
        return res.status(400).send({
          error: true,
          message: "Id_user is required",
        });
      } else if (!res.locals.owner.adminLevel && req.body.id_user) {
        // The client who is not an admin does not have to specify an id_user field.

        return res.status(400).send({
          error: true,
          message: "You do not have to specify the user id",
        });
      }

      // Check if this title exist in the list of the client, if the same title exist, send back an 400 response status code with message.

      const isTitleExist = await Address.findOne({
        title: { $regex: `^${req.body.title}$`, $options: "gi" },
        id_user: ownerId,
      });

      if (isTitleExist)
        return res.status(400).send({
          error: true,
          message: "Error duplicating address title or no change detected",
        });
    }

    // If all the checks is passing, update the address, then send back a 200 response status code with succesfull message.

    await Address.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    return res.send({
      modified: true,
      message: "Address modified with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteAddressById = async (req, res) => {
  try {
    // Check if the client has an address with the id provided.

    const isOwner = await Address.findOne({
      _id: req.params.id,
      id_user: res.locals.owner.id,
    });

    // If the client does not have an address with the id provided send him a 200 response status code http with a message

    if (!isOwner && !res.locals.owner.adminLevel)
      return res.status(200).send({
        error: true,
        message:
          "Empty list, you are not the owner of the address or you do not have admin rights",
      });

    // Check if an address exist and delete.

    const address = await Address.findByIdAndRemove(req.params.id);

    // If address not return an address, send a 400 response status code with a message

    if (!address)
      return res
        .status(400)
        .send({ message: "There are not address to delete" });

    // If all the checks is passing, update the address, then send back a 200 response status code with succesfull message.

    return res.send({
      modified: true,
      message: "Address deleted with success",
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
