const {
  Article,
  schemaValidationArticle,
  schemaPutValidationArticle,
} = require("../models/articleModel");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const UPLOAD_IMG_PATH = "uploads/img/";
const crypto = require("crypto");

exports.getAllArticle = async function (req, res) {
  try {
    // Find all the articles, then return them to the client.
    // Find all the active categories, then return them to the client.
    const verify = jwt.verify(
      req.cookies["x-auth-token"],
      process.env.PRIVATE_KEY
    );

    const allArticle = await Article.find().populate(
      "id_category",
      "title -_id"
    );
    return res.status(200).send({
      adminLevel: verify.adminLevel,
      data: allArticle,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.getArticleById = async function (req, res) {
  try {
    // Find an article by id, then return it to the client.

    const article = await Article.findById(req.params.id)
      .select("id_user title description price pictures")
      .populate("id_category", "title description -_id")
      .populate("id_user", "lastName firstName email");

    // If there are not article with this id return a 400 response status code with a message.

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided",
      });

    // If there is an existing article, send back a 200 response status code with a this article.

    return res.send(article);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postArticle = async function (req, res) {
  try {
    // Only an existing admin or an existing user can perform this action.
    const form = new formidable.IncomingForm();
    let objdata = {};
    const formdata = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        // store the fields sended by the client in the objdata
        objdata = fields;
        objdata["pictures"] = [];
        // initialize the name of the picture and the path
        for (const file of Object.entries(files)) {
          const title = file[1].name;
          const ext = title.split(".");
          const random = Math.random().toString();
          const path = `${crypto
            .createHash("sha1")
            .update(ext[0] + random)
            .digest("hex")}.${ext[1]}`;
          objdata["pictures"] = [
            ...objdata["pictures"],
            {
              title: title,
              path_picture: path,
            },
          ];

          fs.rename(file[1].path, `${UPLOAD_IMG_PATH}/${path}`, (err) => {
            if (err) throw err;
          });
        }
        resolve("done");
      });
    });

    if (formdata === "done") {
      // Validation post article.

      const { error } = schemaValidationArticle.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // Get the id of the client

      objdata["id_user"] = res.locals.owner.adminLevel
        ? objdata.id_user
        : res.locals.owner.id;

      // Get the max value of articleId and increment it to the next article registered.

      const maxId = await Article.find()
        .sort({ articleId: -1 })
        .limit(1)
        .select("articleId");

      let valueId;

      // If the maxId does not return a value set the valueId to 1 by default.

      maxId.length == 0 ? (valueId = 1) : (valueId = maxId[0].articleId + 1);

      objdata["articleId"] = valueId;

      // Create a new article document.

      const article = new Article(objdata);

      // If all the checks is passing, save the article, then send back a 200 response status code with a successfull message.

      await article.save();

      return res
        .status(201)
        .send({ error: false, message: `The article has been created` });
    }
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.putArticleById = async function (req, res) {
  try {
    // Only an existing admin or an existing owner user can perform this action.

    // Validation put article.

    const { error } = schemaPutValidationArticle.validate(req.body);
    if (error)
      return res.status(400).send({ error: true, message: error.message });

    // If req.body.id_user is sent, return a 400 response status sode with a message.

    if (req.body.id_user)
      return res.status(400).send({
        error: true,
        message: "Error your are not authorized to modify user ID",
      });

    // Check if the article title is already existing.

    const isTitleExist = await Article.findOne({
      title: { $regex: `^${req.body.title}$`, $options: "i" },
    });

    // If the article title is already existing send a 400 response status code with a message.

    if (isTitleExist)
      return res.status(400).send({
        error: true,
        message: "Error duplicating article title or no change detected",
      });

    // Check if the article is existing.

    let article = await Article.findOne({ _id: req.params.id });

    // If there is not article with the id provided, send back a 400 response status code with a message.

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided",
      });

    // If the article exist, if the user is not owner and it is not an admin or a superadmin, send back a 400 response status code with a message.

    if (
      article.id_user.toString() !== res.locals.owner.id &&
      res.locals.owner.adminLevel !== "admin" &&
      res.locals.owner.adminLevel !== "superadmin"
    )
      return res.status(400).send({
        error: true,
        message: "Error you don't have the permission to modify this article",
      });

    // If all the checks is passing, update the article, then send back a 200 response status code with succesfull message.

    article = await Article.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      date_update: Date.now(),
    });

    return res.status(201).send(`The article has been modified`);
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.deleteArticleById = async function (req, res) {
  try {
    // Only an existing admin can perform this action.

    // Check if an article exist and delete.

    const article = await Article.findById(req.params.id);

    // If there is not article with the id provided, send back a 400 response status code with a message.

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided",
      });

    // delete all picture associated with the article

    article.pictures.forEach((e) => {
      fs.unlinkSync(`${UPLOAD_IMG_PATH}/${e.path_picture}`);
    });

    await Article.findByIdAndRemove(req.params.id);

    // If all the checks is passing, delete the article, then send back a 200 response status code with succesfull message.

    return res.send({
      message: `The ${article.title} has been removed`,
    });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};
