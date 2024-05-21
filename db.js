const mongoose = require("mongoose");
const keys = require("./config/keys");

// MongoDB Configuration
mongoose
  .connect(keys.mongoURI, { dbName: keys.dbName })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
