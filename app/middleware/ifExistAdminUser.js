const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");
const { User } = require("../models/userModel");

// This middleware ensure that the client request comes by an admin or by an user that is not deleted.

module.exports = function(req, res, next) {
  jwt.verify(
    req.header("x-auth-token"),
    process.env.PRIVATE_KEY,
    async function(err, decode) {
      if (err)
        return res.status(401).send({ error: true, message: err.message });
      let user = await User.findById(decode.id);
      if (user) {
        res.locals.owner = user;
        next();
      } else {
        let admin = await Admin.findById(decode.id);
        if (admin) {
          res.locals.owner = admin;
          next();
        } else {
          return res
            .status(404)
            .send({ error: true, message: "JWT ID authentication failed" });
        }
      }
    }
  );
};
