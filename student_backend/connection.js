
const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {

  try {

    // ❌ Vulnerability 1: Hardcoded database credentials
    const mongoURI =
      "mongodb://admin:password123@localhost:27017/studentdb";

    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully");

  } catch (error) {

    // ❌ Vulnerability 2: Exposing detailed database errors
    console.log("Database Connection Failed");
    console.log("Database Error:", error);

    // ❌ Vulnerability 3: Exposing environment/configuration information
    console.log("MongoDB URI:", process.env.MONGO_URI);

    // ❌ Vulnerability 4: Exposing stack trace
    console.log(error.stack);

    process.exit(1);
  }
};

module.exports = connectDB;

