const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },

  path_picture: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  }
});

const articleSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  id_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  articleId: {
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

  pictures: [imageSchema],

  price: {
    type: Number,
    required: true,
    min: 1,
    max: 2000
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

const schemaValidationArticle = Joi.object({
  id_user: Joi.string(),

  id_category: Joi.string(),

  id_article: Joi.string(),

  pictures: Joi.array().length(3),

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
    .min(1)
    .max(2000)
    .required(),

  isActive: Joi.boolean()
});

// Validator put with the required fields.

const schemaPutValidationArticle = Joi.object({
  id_user: Joi.string(),

  id_category: Joi.string(),

  id_article: Joi.string(),

  pictures: Joi.array().length(3),

  title: Joi.string()
    .pattern(new RegExp(/[\w\d\séùàüäîçïèêôö]*$/))
    .min(3)
    .max(30),

  description: Joi.string()
    .min(10)
    .max(200),

  price: Joi.number()
    .min(1)
    .max(2000),

  isActive: Joi.boolean()
});

const Article = mongoose.model("Article", articleSchema);

module.exports.Article = Article;
module.exports.schemaValidationArticle = schemaValidationArticle;
module.exports.schemaPutValidationArticle = schemaPutValidationArticle;
