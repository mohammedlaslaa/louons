module.exports = function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({ error: true, message: "Empty request body" });
  }
  next();
};
