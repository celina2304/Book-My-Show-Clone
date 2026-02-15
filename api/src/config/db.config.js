// db config file
import mongoose from "mongoose";
import config from "./config.js";

// avoid unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

const connectMongo = async (retries = 5, delay = 3000) => {
  const URI = config.mongo_uri;
  if (!URI) {
    console.error("MongoDB URI is missing in config");
    process.exit(1);
  }

  try {
    // Secure connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // 10s timeout for server selection
      maxPoolSize: 10, // limit connections
      minPoolSize: 1,
      autoIndex: false, // disable auto-indexing in production
      connectTimeoutMS: 10000,
    };

    // Connect to MongoDB
    await mongoose.connect(URI, options);
    console.log("MongoDB connected successfully");

    // Optional: handle runtime disconnects
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB runtime error:", err.message);
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);

    if (retries > 0) {
      console.log(`Retrying connection in ${delay / 1000}s... (${retries} attempts left)`);
      await new Promise((res) => setTimeout(res, delay));
      return connectMongo(retries - 1, delay);
    } else {
      console.error("Could not connect to MongoDB after multiple attempts. Exiting.");
      process.exit(1);
    }
  }
};

export default connectMongo;
