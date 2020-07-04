require("dotenv").config();
const express = require("express");
const app = express();

// Get the port registered or set this to 5000 by default.
const port = process.env.PORT || 8080;

// Charging all routes of the app.
require("./startup/route")(app);

app.use(express.static(__dirname + '/public'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get(/^\/(?!louons\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connection to the Database.
require("./startup/database.js");

// Make the application accessible to the port registered in the port variable.
app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});
