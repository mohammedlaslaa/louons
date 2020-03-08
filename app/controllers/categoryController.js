const {
  Category,
  schemaValidationCategory,
  schemaPutValidationCategory
} = require("../models/categoryModel");

exports.getAllCategory = async function(req, res) {
  try {
    const allCategory = await Category.find();
    return res.send(allCategory);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
exports.getCategoryById = async function(req, res) {
  try {
    const category = await Category.findById(req.params.id).select(
      "id_admin title description"
    );

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided"
      });

    return res.send(category);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
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

    const isTitleExist = await Category.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating category title" });

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
exports.putCategoryById = async function(req, res) {
  const { error } = schemaPutValidationCategory.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.id_admin)
      return res
        .status(400)
        .send({
          error: true,
          message: "Error your are not authorized to modify admin ID"
        });

    const isTitleExist = await Category.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating category title" });

    let category = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided"
      });

    await category.save();

    return res.status(201).send(`The category has been modified`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
exports.deleteCategoryById = async function(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided"
      });

    return res.send({error: false, message : `The ${category.title} has been removed`});
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
