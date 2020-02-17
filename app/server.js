require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const customers = require("./routes/customerRoutes");
const authUser = require("./routes/authentificationUserRoute");
const admin = require("./routes/adminRoutes");

require("./startup/database.js");

// Morgan send many informations of the request status.

(process.env.NODE_ENV == 'dev') ? app.use(morgan("tiny")) : "";

app.use(helmet());
app.use(express.json());
app.use("/louons/api/v1/customers", customers);
app.use("/louons/api/v1/authentification", authUser);
app.use("/louons/api/v1/admin", admin);

app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
