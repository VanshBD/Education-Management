const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces around the name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  password: {
    type: String,
    required: true, // Password field is required
  },
  role: {
    type: String,
    enum: ["Admin", "Teacher", "Student"], // Restrict role to predefined values
    default: "Student", // Default role is "Student"
  },
});

// Middleware: Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified or new
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with saltRounds = 10
  next();
});

// Method: Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compares plain password with hashed password
};

// Export the User model
module.exports = mongoose.model("User", UserSchema);