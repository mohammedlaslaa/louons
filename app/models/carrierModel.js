const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const carrierSchema = new mongoose.Schema({
  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },

  carrierId: {
    type: Number,
    default: 1
  },

  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },

  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200
  },

  price: {
    type: Number,
    required: true,
    min: 3,
    max: 50
  },

  delay_delivery: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },

  path_picture: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
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

// Note that the fields send in the request that are not in this JOI Object will automatically throw a rejected request.

// Validator with the required fields.

const schemaValidationCarrier = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30)
    .required(),

  description: Joi.string()
    .min(10)
    .max(200)
    .required(),

  price: Joi.number()
    .min(3)
    .max(50)
    .required(),

  delay_delivery: Joi.number()
    .min(1)
    .max(10)
    .required(),

  path_picture: Joi.string()
    .min(10)
    .max(50)
    .required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationCarrier = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30),

  description: Joi.string()
    .min(10)
    .max(200),

  price: Joi.number()
    .min(3)
    .max(50),

  delay_delivery: Joi.number()
    .min(1)
    .max(10),

  path_picture: Joi.string()
    .min(10)
    .max(50),

  isActive: Joi.boolean()
});

const Carrier = mongoose.model("Carrier", carrierSchema);

module.exports.Carrier = Carrier;
module.exports.schemaValidationCarrier = schemaValidationCarrier;
module.exports.schemaPutValidationCarrier = schemaPutValidationCarrier;
