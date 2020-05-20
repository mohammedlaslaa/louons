const mongoose = require("mongoose");

// This middleware verify if the id sended by the client is valid.

module.exports = function (req, res, next) {
  if (Object.keys(req.query) !== 0) {
    next();
  } else if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    return res.status(404).send({
      error: true,
      message: "Error, the id must to be a valid objectId !",
    });
  }
};
