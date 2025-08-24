const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/todo-app";
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("💡 Make sure MongoDB is running or check your connection string");
    process.exit(1);
  }
};

module.exports = connectDB;
// This file is responsible for connecting to the MongoDB database using Mongoose.
