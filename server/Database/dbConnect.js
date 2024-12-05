const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Database connected");
    } else {
      console.log("Database is not connected");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

module.exports = dbConnect;
