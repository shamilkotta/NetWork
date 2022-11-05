const express = require("express");

const loginValidation = require("../middlewares/validators/loginValidation");
const signupValidation = require("../middlewares/validators/signupValidation");
const {
  getHome,
  postLogin,
  postSignup,
  postSettings,
  getUser,
} = require("../controllers");
const { verifyLogin } = require("../middlewares/authorization");

const router = express.Router();

router.get("/", verifyLogin, getHome);

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

router.get("/profile", verifyLogin, (req, res) => {
  res.render("profile", { user: req.session.user });
});

router.get("/settings", verifyLogin, (req, res) => {
  res.render("settings", { user: req.session.user });
});

router.post("/settings", signupValidation, postSettings);

router.get("/user/:id", getUser);

module.exports = router;
