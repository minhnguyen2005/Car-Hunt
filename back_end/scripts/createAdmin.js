import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@carhunt.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@carhunt.com",
      phone: "1234567890",
      password: "admin123", // Change this password in production!
      role: "admin",
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@carhunt.com");
    console.log("Password: admin123");
    console.log("⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
