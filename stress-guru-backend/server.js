// Load environment variables from db.env
require("dotenv").config({ path: "./db.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser"); // New line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Adjust for frontend origin
app.use(express.json()); // Parses JSON data
app.use(bodyParser.json()); // New line

// MongoDB Connection (Local)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// User Schema and Model
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ChatbotData Schema and Model (New lines)
const ChatbotData = mongoose.model(
  "ChatbotData",
  new mongoose.Schema({
    type: String,
    data: Object,
  })
);

// Register Endpoint
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send({ success: false, error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ success: true, message: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).send({ success: false, error: `${field} already exists.` });
    }
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ success: false, error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, error: "Invalid email or password." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ success: false, error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      success: true,
      message: "Login successful!",
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// Reset Password Endpoint
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send({ success: false, error: "Email and new password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, error: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ success: true, message: "Password reset successful!" });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ success: false, error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(403).send({ success: false, error: "Invalid or expired token" });
  }
};

// Endpoint to fetch current user's details
app.get("/current-user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ success: false, error: "User not found" });
    }

    res.status(200).send({ success: true, username: user.username });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// API to Get Chatbot Prompts (New lines)
app.get("/api/chatbot/prompts", async (req, res) => {
  try {
    const prompts = await ChatbotData.findOne({ type: "chatbot_data" });
    res.json(prompts.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chatbot prompts" });
  }
});

// API to Get DASS-21 Data (New lines)
app.get("/api/chatbot/dass", async (req, res) => {
  try {
    const dassData = await ChatbotData.findOne({ type: "dass_data" });
    res.json(dassData.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch DASS-21 data" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
