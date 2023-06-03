const mongoose = require("mongoose");
const config = require("config");

const dbHandle = async () => {
  try {
    await mongoose.connect(config.get("dbURL"));
    console.log("Database Successuflly connected...");
  } catch (error) {
    console.log("server Error..." + error.message);
    console.log(error);
    process.exit(1);
  }
};
module.exports = dbHandle;

