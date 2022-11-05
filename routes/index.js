const express = require("express");

const loginValidation = require("../middlewares/validators/loginValidation");
const signupValidation = require("../middlewares/validators/signupValidation");
const { getHome, postLogin, postSignup, postSettings } = require("../controllers");

const router = express.Router();

router.get("/", getHome);

router.get("/login", (req, res) => {
  if (req.session.logedIn) res.redirect("/");
  else res.render("login");
});

router.post("/login", loginValidation, postLogin);

router.get("/signup", (req, res) => {
  if (req.session.logedIn) res.redirect("/");
  else res.render("signup");
});

router.post("/signup", signupValidation, postSignup);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/profile", (req, res) => {
  if (req.session.logedIn) res.render("profile", { user: req.session.user });
  else res.redirect("/login");
});

router.get("/settings", (req, res) => {
  if (req.session.logedIn) res.render("settings", { user: req.session.user });
  else res.redirect("/login");
});

router.post("/settings", signupValidation, postSettings)

module.exports = router;
