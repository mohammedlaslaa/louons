const {
  Category,
  schemaValidationCategory,
  schemaPutValidationCategory,
} = require("../models/categoryModel");

exports.getAllCategory = async function (req, res) {
  try {
    // Find all the categories, then return them to the client.

    const allCategory = await Category.find({ isActive: true }).select("categoryId title link");
    return res.send(allCategory);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getCategoryById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Find a category by id, then return it to the client.

    const category = await Category.findById(req.params.id).select(
      "title description"
    );

    // If there are not category with this id return a 400 response status code with a message.

    if (!category)
      return res.status(400).send({
        error: true,
        message: "There are not category with the id provided",
      });

    // If there is an existing category, send back a 200 response status code with a this category.

    return res.send(category);
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

    // Check if the category title is already existing.

    const isTitleExist = await Category.findOne({
      $or: [
        { title: { $regex: `^${req.body.title}$`, $options: "i" } },
        { link: { $regex: `^${req.body.link}$`, $options: "i" } },
      ],
    });
    console.log(isTitleExist);
    // If the category title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating category title or link" });

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

    return res.status(201).send(`The category has been created`);
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

    // Check if the category title is already existing.

    const isTitleExist = await Category.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" },
    });

    // If the category title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating category title or no change detected",
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

    return res.status(201).send(`The category has been modified`);
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
