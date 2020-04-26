const jwt = require("jsonwebtoken");
const {
  User,
  schemaValidationUser,
  schemaPutValidationUser,
} = require("../models/userModel");
const bcrypt = require("bcrypt");

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
    // Validation post inscription user.

    const { error } = schemaValidationUser.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Hash the password send by the client.

    const hashPwd = await bcrypt.hash(
      req.body.password,
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

    // Create a new user document.

    const user = new User({
      clientId: valueId,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashPwd,
      date_birth: req.body.date_birth,
    });

    // If all the checks is passing, save the user, then send back a 200 response status code with a successfull message and a token in the header.

    await user.save();

    return res
      .status(201)
      .header("x-auth-token", user.generateToken())
      .send(`The ${user.lastName} user count has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Only an admin can perform this action.

    const allUsers = await User.find().select('-password -email -date_delete -dateBirth -date_update');

    // If the request fail, return a 400 response status code with a message.

    if (!allUsers)
      return res.status(400).send({ error: true, message: "Bad request" });

    // If all the checks is passing, return a 200 response status code with all users.

    return res.send(allUsers);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Only an admin can perform this action.

    // Check if there are an existing user with the req.params.id provided by the client.

    const user = await User.findById(req.params.id).select(
      "clientId firstName lastName email dateBirth"
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

    // Check if an user exist and update.

    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    // If there are not user find, send a 400 response status code with a message.

    if (!user)
      return res.status(400).send({ error: true, message: "Bad request Id" });

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send({
      modified: true,
      message: "User modified with success",
    });
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

    // If all the checks is passing, return a 200 response status code with a succesfull message.

    return res.send(`User ${user.lastName} has been removed with success`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
