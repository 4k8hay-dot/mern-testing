
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./connection");

const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// ❌ Vulnerability 1: Allow requests from any website
app.use(cors({
  origin: "*"
}));

// Middleware
app.use(express.json());

// ❌ Vulnerability 2: Accept very large request bodies
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "100mb"
}));

// Database Connection
connectDB();

// Routes
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);

// ❌ Vulnerability 3: Expose sensitive server information
app.get("/", (req, res) => {
  res.send(`
    Student Backend Server Running...
    Node Version: ${process.version}
    Environment: ${process.env.NODE_ENV}
  `);
});

// ❌ Vulnerability 4: Debug endpoint exposing environment variables
app.get("/debug", (req, res) => {
  res.json({
    environment: process.env
  });
});

// ❌ Vulnerability 5: No security headers
// ❌ Vulnerability 6: No rate limiting
// ❌ Vulnerability 7: No request validation
// ❌ Vulnerability 8: No authentication middleware globally

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

