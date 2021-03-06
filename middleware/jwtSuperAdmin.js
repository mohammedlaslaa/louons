const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");

// This middleware ensure that the client request comes by a superadmin.

module.exports = function(req, res, next) {
  jwt.verify(
    req.cookies['x-auth-token'],
    process.env.PRIVATE_KEY,
    async function(err, decode) {
      let admin = true;
      if (!err) {
        // If the verify not fail, check if the client is an existing admin.
        admin = await Admin.findById(decode.id);
      }
      if (err || !admin || admin.adminLevel !== "superadmin") {
        // If check verify fail, or if the client is not an admin or if the client is an admin but not a superadmin send a 401 error.
        return res
          .status(401)
          .send({ error: true, message: "Not authorized admin level" });
      } else {
        // If check verify not fail, and if the client is an admin and if the client is a superadmin send the decode to the res.locals.verify.
        res.locals.verify = decode;
        next();
      }
    }
  );
};
