if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();

const routes = require("./routes/router");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errorHandler);

module.exports = app;
