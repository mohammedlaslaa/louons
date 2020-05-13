const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");
const { User } = require("../models/userModel");

// This middleware ensure that the client request comes by an admin or by an user that is not deleted.

module.exports = function(req, res, next) {
  jwt.verify(
    req.cookies['x-auth-token'],
    process.env.PRIVATE_KEY,
    async function(err, decode) {
      if (err)
        // If the verify fail, send a 401 error.
        return res.status(401).send({ error: true, message: err.message });
      // Check if this user still exist
      let user = await User.findById(decode.id).select("clientId lastName firstName");
      if (user) {
        // If the client is an existing user send this to the res.locals.
        res.locals.owner = user;
        next();
      } else {
        // If the client is not an existing user check if it is an admin.
        let admin = await Admin.findById(decode.id).select("adminId lastName firstName adminLevel path_picture");
        if (admin) {
          // If the client is an existing admin send this to the res.locals.
          res.locals.owner = admin;
          next();
        } else {
          // If the client is not an existing admin send a 404 error with a message.
          return res
            .status(404)
            .send({ error: true, message: "JWT ID authentication failed" });
        }
      }
    }
  );
};
