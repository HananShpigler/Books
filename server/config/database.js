const mongoose = require("mongoose");
const config = require("config");
const db = config.get("CONNECTION_URL");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is Connected...");
    mongoose.set("useFindAndModify", false);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
