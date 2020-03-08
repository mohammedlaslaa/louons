const {
  Category,
  schemaValidationCategory,
  schemaPutValidationCategory
} = require("../models/categoryModel");

exports.getAllCategory = async function(req, res) {};
exports.getCategoryById = async function(req, res) {};
exports.postCategory = async function(req, res) {
  const { error } = schemaValidationCategory.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    const maxId = await Category.find()
      .sort({ categoryId: -1 })
      .limit(1)
      .select("categoryId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].categoryId + 1);

    let category = await Category.findOne({ title: req.body.title });
    if (category)
      return res
        .status(400)
        .send({ error: true, message: "This category title already exist" });

    category = new Category({
      id_admin: res.locals.admin.id,
      categoryId: valueId,
      title: req.body.title,
      description: req.body.description
    });

    await category.save();

    return res.status(201).send(`The category has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
exports.putCategoryById = async function(req, res) {};
exports.deleteCategoryById = async function(req, res) {};
