require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const user = require("./routes/userRoute");
const authUser = require("./routes/authentificationUserRoute");
const authAdmin = require("./routes/authentificationAdminRoute");
const admin = require("./routes/adminRoute");
const address = require("./routes/addressRoute");
const category = require("./routes/categoryRoute");
const carrier = require("./routes/carrierRoute");
const payment = require("./routes/paymentRoute");
const article = require("./routes/articleRoute");

app.use(cors());

require("./startup/database.js");

// Morgan send many informations of the request status.

process.env.NODE_ENV == "dev" ? app.use(morgan("tiny")) : "";

app.use(helmet());
app.use(express.json());
app.use("/louons/api/v1/user", user);
app.use("/louons/api/v1/authentificationuser", authUser);
app.use("/louons/api/v1/authentificationadmin", authAdmin);
app.use("/louons/api/v1/admin", admin);
app.use("/louons/api/v1/address", address);
app.use("/louons/api/v1/category", category);
app.use("/louons/api/v1/carrier", carrier);
app.use("/louons/api/v1/payment", payment);
app.use("/louons/api/v1/article", article);

app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
