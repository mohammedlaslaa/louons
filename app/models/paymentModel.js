const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const paymentSchema = new mongoose.Schema({
  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  paymentId: {
    type: Number,
    default: 1,
  },

  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },

  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },

  path_picture: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
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

const schemaValidationPayment = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30)
    .required(),

  description: Joi.string().min(10).max(200).required(),
  
  path_picture: Joi.string().required(),

  isActive: Joi.boolean(),
});

// Validator put with the required fields.

const schemaPutValidationPayment = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30),

  description: Joi.string().min(10).max(200),

  path_picture: Joi.string(),

  isActive: Joi.boolean(),
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports.Payment = Payment;
module.exports.schemaValidationPayment = schemaValidationPayment;
module.exports.schemaPutValidationPayment = schemaPutValidationPayment;
