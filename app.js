const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { engine } = require("express-handlebars");
require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");
const indexRouter = require("./routes");
const adminRouter = require("./routes/admin");

const app = express();

// logger
app.use(logger("dev"));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set("views", "./views");
app.set("view engine", "hbs");
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "index" }));

// static
app.use("/static", express.static(`${__dirname}/public`));

// routes
app.use("/", indexRouter);
app.use("/admin", adminRouter);

// 404
app.use((req, res, next) => {
  next(new Error("Not found"));
});

// error handler
app.use(errorHandler);

module.exports = app;
