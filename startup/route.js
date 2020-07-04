const express = require("express");
const user = require("../routes/userRoute");
const authUser = require("../routes/authenticationUserRoute");
const authAdmin = require("../routes/authenticationAdminRoute");
const admin = require("../routes/adminRoute");
const address = require("../routes/addressRoute");
const category = require("../routes/categoryRoute");
const carrier = require("../routes/carrierRoute");
const payment = require("../routes/paymentRoute");
const article = require("../routes/articleRoute");
const rental = require("../routes/rentalRoute");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

module.exports = function (app) {
  // Morgan send many informations of the request status in a dev environment.
  process.env.NODE_ENV == "dev" &&  app.use(morgan("tiny"));
  // Only parse JSON incoming requests.
  app.use(express.json());
  // Get the cookie parser.
  app.use(cookieParser());
  // Accept cors request.
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  // Secure Express apps by setting various HTTP headers.
  app.use(helmet());
  // Authentification User route.
  app.use("/louons/api/v1/authenticationuser", authUser);
  // Authentification Admin route.
  app.use("/louons/api/v1/authenticationadmin", authAdmin);
  // User routes.
  app.use("/louons/api/v1/user", user);
  // Admin routes.
  app.use("/louons/api/v1/admin", admin);
  // Address routes.
  app.use("/louons/api/v1/address", address);
  // Category routes.
  app.use("/louons/api/v1/category", category);
  // Carrier routes.
  app.use("/louons/api/v1/carrier", carrier);
  // Payment routes.
  app.use("/louons/api/v1/payment", payment);
  // Article routes.
  app.use("/louons/api/v1/article", article);
  // Rental routes.
  app.use("/louons/api/v1/rental", rental);
};
