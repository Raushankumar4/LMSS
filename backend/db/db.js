const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.DB_CONNECTION_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB Connected SuccessFully ${instance.connection.host}`)
  } catch (error) {
    console.log(`Something went Wrong While nnecting DB${error}`);
  }
};

module.exports = connectDB
