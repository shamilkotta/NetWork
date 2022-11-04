const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();

// logger
app.use(logger("dev"));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static
app.use("/static", express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
  res.send("Hi welcome");
});

// 404
app.use((req, res, next) => {
  next(new Error("Not found"));
});

// error handler
app.use(errorHandler);

module.exports = app;
