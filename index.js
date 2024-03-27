require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const logger = require("./services/logging");

app.use(
  cors({
    origin: "https://audiophile-ecommerce-webapp.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Listening on port ${port}`));
