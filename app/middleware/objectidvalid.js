const mongoose = require("mongoose");

module.exports = function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    return res.status(404).send({message : 'Error !'})
  }
}