const jwt = require("jsonwebtoken");

// This middleware ensure that the client request comes by an admin.

module.exports = function(req, res, next) {
  jwt.verify(req.header("x-auth-token"), process.env.PRIVATE_KEY, function(
    err,
    decode
  ) {
    if (
      err ||
      (decode.adminLevel !== "admin" && decode.adminLevel !== "superadmin")
    ) {
      return res.status(401).send({ error: true, message: "Not Authorized !" });
    } else {
      next();
    }
  });
};
