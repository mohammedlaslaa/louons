require("dotenv").config();
const express = require("express");
const app = express();

// Get the port registered or set this to 5000 by default.
const port = process.env.PORT || 5000;

// Charging all routes of the app.
require("./startup/route")(app);

// Connection to the Database.
require("./startup/database.js");

// Make the application accessible to the port registered in the port variable.
app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
