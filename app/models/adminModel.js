const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const adminSchema = new mongoose.Schema({
  adminId: {
    type: Number,
    default : 1
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

  adminLevel: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "user",
    required : true
  },

  isActive: {
    type: Boolean,
    default: true
  }
});

adminSchema.methods.generateToken = function() {
  const token = jwt.sign(
    { id: this._id, adminLevel: this.adminLevel },
    process.env.PRIVATE_KEY,
    {
      expiresIn: 604800
    }
  );
  return token;
};

// Validator with the required fields.

const schemaValidationAdmin = Joi.object({
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
    .required(),

  adminLevel: Joi.string().required() 
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports.Admin = Admin;
module.exports.schemaValidationAdmin = schemaValidationAdmin;
