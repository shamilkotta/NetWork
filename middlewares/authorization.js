const ErrorResponse = require("../utils/ErrorResponse");

module.exports.verifyLogin = (req, res, next) => {
  if (req.session.logedIn) next();
  else res.redirect("/login");
};

module.exports.verifyGuest = (req, res, next) => {
  if (req.session.logedIn) res.redirect("/");
  else next();
};

module.exports.verifyAdmin = (req, res, next) => {
  if (req.session.logedIn && req.session.admin) next();
  else if (req.session.logedIn) next(new ErrorResponse(404));
  else res.redirect("/login");
};
