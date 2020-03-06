const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const addressSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  addressId: {
    type: Number
  },

  address: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80
  },

  zipcode: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10
  },

  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },

  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
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
  }
});

// Validator with the required fields.

const schemaValidationAddress = Joi.object({
  address: Joi.string()
    .alphanum()
    .min(10)
    .max(80)
    .required(),

  zipcode: Joi.string()
    .alphanum()
    .min(3)
    .max(10)
    .required(),

  city: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),

  country: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationAddress = Joi.object({
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(50),

  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(50),

  dateBirth: Joi.date().iso(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(new RegExp(/^[a-z]*([.]|\w)[a-z]*\d*[@][a-z]*[.]\w{2,5}/)),

  password: Joi.string().pattern(
    new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
    )
  ),

  adminLevel: Joi.string()
});

const Address = mongoose.model("Address", addressSchema);

module.exports.Address = Address;
module.exports.schemaValidationAddress = schemaValidationAddress;
module.exports.schemaPutValidationAddress = schemaPutValidationAddress;
