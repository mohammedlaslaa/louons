const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorySchema = new mongoose.Schema({
  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },

  categoryId: {
    type: Number,
    default : 1
  },

  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },

  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255
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
    default: false
  }
});

// Note that the fields send in the request that are not in this JOI Object will automatically throw a rejected request.

// Validator with the required fields.

const schemaValidationCategory = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30)
    .required(),

  description: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(20)
    .max(255)
    .required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationCategory = Joi.object({
  id_admin: Joi.string(),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30),

  description: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(20)
    .max(255),

  isActive: Joi.boolean()
});

const Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
module.exports.schemaValidationCategory = schemaValidationCategory;
module.exports.schemaPutValidationCategory = schemaPutValidationCategory;
