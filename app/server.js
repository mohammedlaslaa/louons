require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const helmet = require("helmet");
app.use(helmet());
const customers = require("./routes/customerRoutes");

require("./startup/database.js");

app.use(express.json());

(process.env.NODE_ENV == 'dev') ? app.use(morgan("tiny")) : "";

app.use("/louons/api/v1/customers", customers);

app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
