import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected!");
  } catch (error) {
    console.error("Error connecting DB");
  }
};

export { connectMongoDB };
