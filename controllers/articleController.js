const {
  Article,
  schemaValidationArticle,
  schemaPutValidationArticle,
} = require("../models/articleModel");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");
const crypto = require("crypto");

exports.getAllArticle = async function (req, res) {
  try {
    // Find all the articles, then return them to the client.
    // Find all the active categories, then return them to the client.

    let verify = {
      adminLevel: "",
    };

    if (req.cookies["x-auth-token"]) {
      verify = jwt.verify(req.cookies["x-auth-token"], process.env.PRIVATE_KEY);
    }

    const allArticle =
      req.params.searcharticle === "owner"
        ? await Article.find({
          id_user: verify.id,
        }).select("-date_update -date_delete -isTop -id_user -articleId")
        : req.params.searcharticle === "lastactive"
          ? await Article.find({
            isActive: true,
          })
            .limit(4)
            .sort({ date_register: -1 })
            .select("price title pictures")
          : req.params.idcategory && req.params.searcharticle === "searcharticle"
            ? await Article.find({
              isActive: true,
              id_category: req.params.idcategory,
            })
              .limit(4)
              .sort({ date_register: -1 })
              .select("price title pictures")
            : req.params.searcharticle
              ? await Article.find({
                isActive: true,
                title: { $regex: req.params.searcharticle, $options: "i" },
              }).select("_id articleId title")
              : verify.adminLevel
                ? await Article.find().populate("id_category", "title -_id")
                : await Article.find({ isActive: true })
                  .sort({ date_register: -1 })
                  .populate("id_category", "title -_id");

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
      .select("id_user title description price pictures isActive")
      .populate("id_category", "title description _id")
      .populate("id_user", "lastName firstName email");

    // If there are not article with this id return a 400 response status code with a message.

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided",
      });

    // If there is an existing article, send back a 200 response status code with a this article.

    return res.send({ error: false, data: article });
  } catch (e) {
    return res.status(404).send({ error: true, message: e.message });
  }
};

exports.postArticle = async function (req, res) {
  try {
    // Only an existing admin or an existing user can perform this action.

    // parse the formdata incoming with formidable

    const form = new formidable.IncomingForm();

    let objdata = {};

    const formdata = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        if (Object.keys(files).length == 0) {
          return res.status(400).send({
            error: true,
            message: "File(s) is needed",
          });
        } else if (Object.keys(files).length > 3) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
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

          mv(
            file[1].path,
            `${process.env.UPLOAD_IMG_PATH}/${path}`,
            (err) => {
              if (err) throw err;
            }
          );
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

    // Check if the article is existing.

    let article = await Article.findOne({ _id: req.params.id });

    // If there is not article with the id provided, send back a 400 response status code with a message.

    if (!article)
      return res.status(400).send({
        error: true,
        message: "There are not article with the id provided",
      });

    // this condition will be triggerred only when the user would activate or desactivate one article
    if (
      Object.keys(req.body).length === 1 &&
      (req.body.isActive !== undefined || req.body.isTop !== undefined)
    ) {
      // Update the isactive, then, send back a 200 response status code with succesfull message.
      article = await Article.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        date_update: Date.now(),
      });

      return res
        .status(200)
        .send({ error: false, message: `The article has been modified` });
    }

    // parse the formdata incoming with formidable
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

        if (Object.keys(files).length === 3) {
          // delete all previous pictures associated with the article

          article.pictures.forEach((e) => {
            fs.unlinkSync(`${process.env.UPLOAD_IMG_PATH}/${e.path_picture}`);
          });

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

            mv(
              file[1].path,
              `${process.env.UPLOAD_IMG_PATH}/${path}`,
              (err) => {
                if (err) throw err;
              }
            );
          }
        } else if (Object.keys(files).length > 3) {
          return res.status(400).send({
            error: true,
            message: "The number of files sending is wrong",
          });
        }
        resolve("done");
      });
    });

    if (formdata === "done") {
      // Validation put article.
      const { error } = schemaPutValidationArticle.validate(objdata);
      if (error)
        return res.status(400).send({ error: true, message: error.message });

      // If req.body.id_user is sent, return a 400 response status sode with a message.

      if (objdata.id_user)
        return res.status(400).send({
          error: true,
          message: "Error your are not authorized to modify user ID",
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
        $set: objdata,
        date_update: Date.now(),
      });

      return res.status(200).send({
        error: false,
        message: `The article has been modified`,
        pictures: objdata.pictures,
      });
    }
  } catch (e) {
    return res.status(400).send({ error: true, message: e.message });
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
      const path = `${process.env.UPLOAD_IMG_PATH}/${e.path_picture}`;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
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
