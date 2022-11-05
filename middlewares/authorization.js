module.exports.verifyLogin = (req, res, next) => {
  if (req.session.logedIn) next();
  else res.redirect("/login");
};

module.exports.verifyGuest = (req, res, next) => {
  if (req.session.logedIn) res.redirect("/");
  else next();
};
