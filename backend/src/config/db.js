import mongoose from "mongoose";
import seedAdmin from "../utils/seedAdmin.js";
const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await seedAdmin();
    console.log("DB connected!");
  } catch (error) {
    console.error("Error connecting DB");
  }
};

export { connectMongoDB };
