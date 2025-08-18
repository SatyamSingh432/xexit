import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10); // random string
      const hashedPassword = await bcrypt.hash("admin", salt);

      const admin = new User({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Admin user seeded successfully");
    }
  } catch (error) {
    console.error("Admin seeding error:", error);
  }
};

export default seedAdmin;
