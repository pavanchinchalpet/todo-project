const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Set default environment variables if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production";
  console.log("⚠️  Using default JWT_SECRET. Please set JWT_SECRET in your environment for production.");
}

// Connect to Database
connectDB();

// Create Express App
const app = express();

// Middleware
// CORS: allow credentials only for explicit origins (no wildcard)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.WEB_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Ensure localhost:3000 is always included for development
if (!allowedOrigins.includes("http://localhost:3000")) {
  allowedOrigins.push("http://localhost:3000");
}

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      console.log(`CORS blocked origin: ${origin}`);
      return callback(new Error(`CORS not allowed for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers"
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Note: With Express 5, avoid app.options("*") due to path-to-regexp changes.
// The global CORS middleware above will handle preflight requests on matching routes.
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