const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");

// This middleware ensure that the client request comes by an admin or a superadmin.

module.exports = function(req, res, next) {
  jwt.verify(
    req.header("x-auth-token"),
    process.env.PRIVATE_KEY,
    async function(err, decode) {
      let admin = true;
      if (!err) {
        admin = await Admin.findById(decode.id);
      }
      if (err || !admin || admin.adminLevel !== "superadmin") {
        return res
          .status(401)
          .send({ error: true, message: "Not authorized admin level" });
      } else {
        res.locals.verify = decode;
        next();
      }
    }
  );
};
