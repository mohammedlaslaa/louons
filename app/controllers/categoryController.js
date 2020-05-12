const {
  Category,
  schemaValidationCategory,
  schemaPutValidationCategory,
} = require("../models/categoryModel");
const jwt = require("jsonwebtoken");

exports.getAllCategory = async function (req, res) {
  try {
    // Find all the active categories, then return them to the client.

    let verify = {
      adminLevel: "",
    };

    if (Object.keys(req.cookies).length > 0) {
      verify = jwt.verify(req.cookies["x-auth-token"], process.env.PRIVATE_KEY);
    }

    const allCategory =
      req.params.isactive === "activecategory"
        ? await Category.find({ isActive: true }).select(
            "categoryId isActive title link description"
          )
        : verify.adminLevel == "admin" || verify.adminLevel == "superadmin"
        ? await Category.find().select(
            "categoryId isActive title link description"
          )
        : await Category.find({ isActive: true }).select(
            "categoryId isActive title link description"
          );

    return res.status(200).send({
      adminLevel: verify.adminLevel,
      data: allCategory,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getCategoryById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Find a category by id, then return it to the client.

    const category = req.query.title
      ? await Category.find({ link: req.query.title }).select(
          "_id title description"
        )
      : await Category.findById(req.params.id);

    // If there are not category with this id return a 400 response status code with a message.

    if (!category || category.length === 0)
      return res.status(404).send({
        error: true,
        message: "There are not category with the id provided",
      });

    // If there is an existing category, send back a 200 response status code with a this category.

    return res.send({ error: false, data: category });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postCategory = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation post category.

    const { error } = schemaValidationCategory.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // Get the max value of categoryId and increment it to the next category registered.

    const maxId = await Category.find()
      .sort({ categoryId: -1 })
      .limit(1)
      .select("categoryId");

    let valueId;

    // If the maxId does not return a value set the valueId to 1 by default.

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].categoryId + 1);

    // Create a new category document.

    const category = new Category({
      id_admin: res.locals.admin.id,
      categoryId: valueId,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    });

    // If all the checks is passing, save the category, then send back a 200 response status code with a successfull message.

    await category.save();

    return res
      .status(201)
      .send({ error: false, message: `The category has been created` });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putCategoryById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Validation put category.

    const { error } = schemaPutValidationCategory.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If req.body.id_admin is sent, return a 400 response status sode with a message.

    if (req.body.id_admin)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify admin ID",
      });

    // Check if the category is existing and update.

    let category = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    // If there is not category with the id provided, send back a 400 response status code with a message.

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided",
      });

    // If all the checks is passing, send back a 200 response status code with succesfull message.

    return res.status(200).send({
      error: false,
      message: `The category has been modified`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteCategoryById = async function (req, res) {
  try {
    // Only an existing superadmin can perform this action.

    // Check if a category exist and delete.

    const category = await Category.findByIdAndRemove(req.params.id);

    // If there is not category with the id provided, send back a 400 response status code with a message.

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided",
      });

    // If all the checks is passing, delete the category, then send back a 200 response status code with succesfull message.
    return res.send({
      error: false,
      message: `The ${category.title} has been removed`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
