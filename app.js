const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");
const indexRouter = require("./routes");
const adminRouter = require("./routes/admin")

const app = express();

// logger
app.use(logger("dev"));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static
app.use("/static", express.static(`${__dirname}/public`))

// routes
app.use("/", indexRouter);
app.use("/admin", adminRouter)

// 404
app.use((req, res, next) => {
  next(new Error("Not found"));
});

// error handler
app.use(errorHandler);

module.exports = app;
