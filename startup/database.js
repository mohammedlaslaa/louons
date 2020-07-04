const mongoose = require("mongoose");

// If the NODE_ENV is equal to dev, connect him to the development database, otherwise, connect him to the production database.

const dblink =
  process.env.NODE_ENV == "dev" ? process.env.DB_DEV : process.env.MONGODB_URI;

// Connect to the dblink.

mongoose
  .connect(dblink, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`Connected to the database`);
  })
  .catch(function(e) {
    console.log(e.message);
  });

module.exports = mongoose;
