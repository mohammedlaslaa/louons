const Joi = require("@hapi/joi");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getIsAuthUser = async (req, res) => {
  if (res.locals.owner.adminLevel) {
    return res.status(400).send({ error: true, message: "Authentication failed" });
  }
  res.send({
    error: false,
    message: "Authentication success",
    user: res.locals.owner,
  });
};

exports.postAuthUser = async (req, res) => {
  try {
    // Validation post user.

    const { error } = schemaValidationMailPwd.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Check if an admin is existing with the req.body.email provided. An account must to be active.

    let user = await User.findOne({ email: req.body.email, isActive: true });

    // If there is not user with the email provided, send back a 400 response status code with a message.

    if (!user)
      return res
        .status(401)
        .send({ error: true, message: "Email or password error" });

    // Compare the user password with the password provided in a req.body.password.

    let decrypt = await bcrypt.compare(req.body.password, user.password);

    // If the comparison fail send back a 400 response status code with a message.

    if (!decrypt)
      return res
        .status(401)
        .send({ error: true, message: "Email or password error" });

    // If all the checks is passing, send back a token to the res.header("x-auth-token").

    res
      .clearCookie("x-auth-token")
      .cookie("x-auth-token", user.generateToken(), {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      })
      .send({ error: false, message: "Authentication success" });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

// Validator of password (one letter uppercase and one special character minimum. One password mut be have one number minimum and this its length must be at least 8 characters ) and valid email.

const schemaValidationMailPwd = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .pattern(
      new RegExp(/^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/)
    ),

  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
      )
    ),
});
