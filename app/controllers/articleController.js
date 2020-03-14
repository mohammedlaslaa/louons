const {
  Article,
  schemaValidationArticle,
  schemaPutValidationArticle
} = require("../models/articleModel");

exports.getAllArticle = async function(req, res) {
  try {
    const allArticle = await Article.find();
    return res.send(allArticle);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getArticleById = async function(req, res) {
  try {
    const article = await Article.findById(req.params.id).select(
      "id_user title description price pictures"
    );

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided"
      });

    return res.send(article);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postArticle = async function(req, res) {
  const { error } = schemaValidationArticle.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    let ownerId = res.locals.owner.adminLevel
      ? req.body.id_user
      : res.locals.owner.id;

    const maxId = await Article.find()
      .sort({ articleId: -1 })
      .limit(1)
      .select("articleId");

    let valueId;

    maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].articleId + 1);

    const isTitleExist = await Article.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res
        .status(400)
        .send({ error: true, message: "Error duplicating article title" });

    const article = new Article({
      id_user: ownerId,
      articleId: valueId,
      id_category: req.body.id_category,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      pictures: req.body.pictures
    });

    await article.save();

    return res.status(201).send(`The article has been created`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putArticleById = async function(req, res) {
  const { error } = schemaPutValidationArticle.validate(req.body);
  if (error)
    return res.status(400).send({ error: true, message: error.message });

  try {
    if (req.body.id_user)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify user ID"
      });

    const isTitleExist = await Article.findOne({
      title: { $regex: req.body.title, $options: "i" }
    });

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating article title or no change detected"
      });

    let article = await Article.findOne({ _id: req.params.id });

    if (article.id_user.toString() !== res.locals.owner.id && !res.locals.owner.adminLevel)
      return res.status(400).send({
        error: true,
        message: "Error you don't have the permission to modify this article"
      });

    article = await Article.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now()
    });

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided"
      });

    await article.save();

    return res.status(201).send(`The article has been modified`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteArticleById = async function(req, res) {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided"
      });

    return res.send({
      error: false,
      message: `The ${article.title} has been removed`
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
