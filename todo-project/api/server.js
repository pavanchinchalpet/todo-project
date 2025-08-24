const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(cors({ 
  origin: process.env.WEB_ORIGIN || "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/test", require("./routes/testRoutes"));

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error occurred" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});