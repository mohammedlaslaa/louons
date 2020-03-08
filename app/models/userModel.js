const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  clientId: {
    type: Number
  },

  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },

  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },

  dateBirth: {
    type: Date,
    default: null
  },

  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 50
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  date_register: {
    type: Date,
    default: Date.now()
  },

  date_update: {
    type: Date,
    default: Date.now()
  },

  date_delete: {
    type: Date,
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isSubscribe: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: 32659200
  });
  return token;
};

// Validator with the required fields.

const schemaValidationUser = Joi.object({
  lastName: Joi.string()
    .pattern(new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/))
    .min(3)
    .max(50)
    .required(),

  firstName: Joi.string()
    .pattern(new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/))
    .min(3)
    .max(50)
    .required(),

  dateBirth: Joi.date().iso(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(
      new RegExp(/^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/)
    )
    .required(),

  password: Joi.string()
    .pattern(
      new RegExp(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
      )
    )
    .required(),

  isActive: Joi.boolean()
});

// Validator without the required fields, more especially to send update requests.

const schemaPutValidationUser = Joi.object({
  lastName: Joi.string()
    .pattern(new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/))
    .min(3)
    .max(50),

  firstName: Joi.string()
    .pattern(new RegExp(/[a-zA-Z\séùàüäîçïèêôö-]+$/))
    .min(3)
    .max(50),

  dateBirth: Joi.date().iso(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(
      new RegExp(/^\w*([.|-]){0,1}\w*([.|-]){0,1}\w*[@][a-z]*[.]\w{2,5}/)
    ),

  password: Joi.string().pattern(
    new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
    )
  ),

  isActive: Joi.boolean()
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.schemaValidationUser = schemaValidationUser;
module.exports.schemaPutValidationUser = schemaPutValidationUser;
