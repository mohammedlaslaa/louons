const mongoose = require("mongoose");

const dblink =
  process.env.NODE_ENV == "dev" ? process.env.DB_LOUONS : process.env.DB_PROD;

mongoose
  .connect(dblink, {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(() => {
    console.log(`Connected to the database ${dblink}`);
  });

module.exports = mongoose;