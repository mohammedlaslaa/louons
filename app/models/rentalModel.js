const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const rentalSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  id_article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },

  id_payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },

  id_carrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carrier",
    required: true,
  },

  rentalId: {
    type: Number,
  },

  start_date: {
    type: Date,
    required: true,
  },

  end_date: {
    type: Date,
    required: true,
  },

  date_register: {
    type: Date,
    default: new Date(),
  },

  date_update: {
    type: Date,
    default: new Date(),
  },

  date_delete: {
    type: Date,
    default: null,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

// Note that the fields send in the request that are not in this JOI Object will automatically throw a rejected request.

// Validator with the required fields.

const schemaValidationRental = Joi.object({
  id_user: Joi.string(),

  id_article: Joi.string(),

  id_payment: Joi.string(),

  id_carrier: Joi.string(),

  start_date: Joi.date().iso(),

  end_date: Joi.date().iso(),
});

// Validator put with the required fields.

const schemaPutValidationRental = Joi.object({
  id_carrier: Joi.string(),

  id_payment: Joi.string(),

  start_date: Joi.date().iso(),

  end_date: Joi.date().iso(),

  date_delete: Joi.date().iso(),

  isActive: Joi.boolean(),
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports.Rental = Rental;
module.exports.schemaValidationRental = schemaValidationRental;
module.exports.schemaPutValidationRental = schemaPutValidationRental;
