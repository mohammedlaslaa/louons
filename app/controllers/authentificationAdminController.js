const Joi = require("@hapi/joi");
const { Admin } = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.postAuthAdmin = async (req, res) => {
  try {
    const { error } = schemaValidationMailPwd.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res
        .status(400)
        .send({ error: true, message: "Email or password error" });

    let decrypt = await bcrypt.compare(req.body.password, admin.password);
    if (!decrypt)
      return res.status(400).send({ error: true, message: "password error" });

    res.header("x-auth-token", admin.generateToken()).send(admin);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

// Validator of password (one letter uppercase and one special character minimum. One password mut be have one number minimum and this its length must be at least 8 characters ) and valid email.

const schemaValidationMailPwd = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .pattern(new RegExp(/^[a-z]*([.]|\w)[a-z]*\d*[@][a-z]*[.]\w{2,5}/)),

  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
      )
    )
});
