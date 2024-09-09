require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const logger = require("./services/logging");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://audiophile-ecommerce-webapp.vercel.app/*"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Listening on port ${port}`));
