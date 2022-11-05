module.exports.verifyLogin = (req, res, next) => {
  if (req.session.logedIn) next();
  else res.redirect("/login");
};
