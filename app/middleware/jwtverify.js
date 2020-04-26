const jwt = require("jsonwebtoken");
const { Admin } = require("../models/adminModel");

// This middleware ensure that the client request comes by an admin or a superadmin.

module.exports = function(req, res, next) {
  console.log(req.cookies)
  jwt.verify(
    req.cookies['x-auth-token'],
    process.env.PRIVATE_KEY,
    async function(err, decode) {
      let admin = true;
      if (!err) {
        // If the verify not fail, check if the client is an existing admin.
        admin = await Admin.findById(decode.id).select("adminId lastName firstName adminLevel");;
      }
      if (
        err ||
        !admin ||
        (admin.adminLevel !== "admin" && admin.adminLevel !== "superadmin")
      ) {
        // // If check verify fail, or if the client is not an admin or if the client is an admin but not an admin or a superdamin send a 401 error.
        // return res.status(401).send({ error: true, message: "Not Authorized" });
        return res.status(401).send({ error: true, message: "Not Authorized" });
      } else {
        // If check verify not fail, and if the client is an admin and if the client is an admin or a superadmin send the admin to the res.locals.admin.
        res.locals.admin = admin;
        next();
      }
    }
  );
};
