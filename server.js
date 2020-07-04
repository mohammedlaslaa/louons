require("dotenv").config();
const express = require("express");
const app = express();

// Get the port registered or set this to 5000 by default.
const port = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'prod') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Charging all routes of the app.
require("./startup/route")(app);

app.use(express.static('public'));

// Connection to the Database.
require("./startup/database.js");

// Make the application accessible to the port registered in the port variable.
app.listen(port, () => {
  console.log(`App listening to the port ${port}`);
});