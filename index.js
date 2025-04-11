require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const logger = require("./services/logging");

const allowedOrigins = [
  "https://audiophile-ecommerce-webapp.vercel.app", // Production
  "http://localhost:5173", // Development
];

// Handle CORS headers manually
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token"
  );

  next();
});

// CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Routes and other setup
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}`));
