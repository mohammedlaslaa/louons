const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  clientId: {
    type: Number
  },

  lastName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },

  firstName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },

  dateBirth: {
    type: Date,
    default: null
  },

  address: {
    type: String,
    minlength: 20,
    maxlength: 200,
    default: null
  },

  zipCode: {
    type: String,
    minlength: 4,
    maxlength: 30,
    default: null
  },

  city: {
    type: String,
    minlength: 10,
    maxlength: 80,
    default: null
  },

  country: {
    type: String,
    minlength: 4,
    maxlength: 80,
    default: null
  },

  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 13,
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

customerSchema.methods.generateToken = function() {
  const token = jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
    expiresIn: 32659200
  });
  return token;
};

const schemaValidationCustomer = Joi.object({
  lastName: Joi.string()
    .alphanum()
    .min(6)
    .max(50)
    .required(),

  firstName: Joi.string()
    .alphanum()
    .min(6)
    .max(50)
    .required(),

  dateBirth: Joi.date().iso(),

  address: Joi.string()
    .alphanum()
    .min(20)
    .max(200),

  zipcode: Joi.number()
    .min(4)
    .max(30),

  city: Joi.string()
    .alphanum()
    .min(10)
    .max(80),

  country: Joi.string()
    .alphanum()
    .min(4)
    .max(80),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(new RegExp(/^[a-z]*([.]|\w)[a-z]*\d*[@][a-z]*[.]\w{2,5}/))
    .required(),

  password: Joi.string()
    .pattern(
      new RegExp(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
      )
    )
    .required()
});

const schemaPutValidationCustomer = Joi.object({
  lastName: Joi.string()
    .alphanum()
    .min(6)
    .max(50),

  firstName: Joi.string()
    .alphanum()
    .min(6)
    .max(50),

  dateBirth: Joi.date().iso(),

  address: Joi.string()
    .alphanum()
    .min(20)
    .max(200),

  zipcode: Joi.number()
    .min(4)
    .max(30),

  city: Joi.string()
    .alphanum()
    .min(10)
    .max(80),

  country: Joi.string()
    .alphanum()
    .min(4)
    .max(80),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(new RegExp(/^[a-z]*([.]|\w)[a-z]*\d*[@][a-z]*[.]\w{2,5}/)),

  password: Joi.string().pattern(
    new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%^&*()+=!?\-';,.\/{}|:<>?~]).{8,20})/
    )
  )
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
module.exports.schemaValidationCustomer = schemaValidationCustomer;
module.exports.schemaPutValidationCustomer = schemaPutValidationCustomer;
