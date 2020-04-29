const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const addressSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  addressId: {
    type: Number
  },

  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
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
    default: new Date()
  },

  date_update: {
    type: Date,
    default: new Date()
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

// Note that the fields send in the request that are not in this JOI Object will automatically throw a rejected request.

// Validator with the required fields.

const schemaValidationAddress = Joi.object({
  id_user: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(5)
    .max(30)
    .required(),

  address: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(10)
    .max(80)
    .required(),

  zipcode: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(10)
    .required(),

  city: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(20)
    .required(),

  country: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(20)
    .required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationAddress = Joi.object({
  id_user: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(5)
    .max(30),

  address: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(10)
    .max(80),

  zipcode: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(10),

  city: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(20),

  country: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(20),

  isActive: Joi.boolean()
});

const Address = mongoose.model("Address", addressSchema);

module.exports.Address = Address;
module.exports.schemaValidationAddress = schemaValidationAddress;
module.exports.schemaPutValidationAddress = schemaPutValidationAddress;
