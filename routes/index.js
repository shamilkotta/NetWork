const express = require("express");

const loginValidation = require("../middlewares/validators/loginValidation");
const signupValidation = require("../middlewares/validators/signupValidation");
const {
  getHome,
  postLogin,
  postSignup,
  getUser,
  postInfo,
} = require("../controllers");
const { verifyLogin, verifyGuest } = require("../middlewares/authorization");

const router = express.Router();

router.get("/", verifyLogin, getHome);

router.get("/login", verifyGuest, (req, res) => {
  res.render("login", { error: req.session.loginErr });
  req.session.loginErr = "";
});

router.post("/login", loginValidation, postLogin);

router.get("/signup", verifyGuest, (req, res) => {
  res.render("signup", { error: req.session.signupErr });
  req.session.signupErr = "";
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
  res.render("settings", {
    user: req.session.user,
    error: req.session.updateErr,
    success: req.session.updateSucc,
  });
  req.session.updateErr = "";
  req.session.updateSucc = "";
});

router.post("/update-info", verifyLogin, signupValidation, postInfo);

router.get("/user/:id", verifyLogin, getUser);

router.get("/404", (req, res) => {
  res.render("404", { user: req.session.user });
});

module.exports = router;
