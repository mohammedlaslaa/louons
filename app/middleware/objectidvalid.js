const mongoose = require("mongoose");

// This middleware verify the id sended by the client request.

module.exports = function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    return res
      .status(404)
      .send({ message: "Error, the id must to be a valid objectId !" });
  }
};
