const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const adminSchema = new mongoose.Schema({
  adminId: {
    type: Number,
    default: 1
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

  adminLevel: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "user",
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }
});

// Generate token method with the private key, the expiresIn option is used to set the token validity period.

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

// Note that the fields send in the request that are not in this JOI Object will automatically throw a rejected request.

// Validator with the required fields.

const schemaValidationAdmin = Joi.object({
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

  adminLevel: Joi.string().valid('admin','superadmin').required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationAdmin = Joi.object({
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

  adminLevel: Joi.string().valid('admin','superadmin'),

  isActive: Joi.boolean()
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports.Admin = Admin;
module.exports.schemaValidationAdmin = schemaValidationAdmin;
module.exports.schemaPutValidationAdmin = schemaPutValidationAdmin;
