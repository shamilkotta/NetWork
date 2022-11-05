const express = require("express");
const { validationResult, matchedData } = require("express-validator");

const loginValidation = require("../middlewares/validators/loginValidation");
const signupValidation = require("../middlewares/validators/signupValidation");
const { signupHelper, loginHelper, getAllUsers } = require("../helpers");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.logedIn) {
    getAllUsers()
      .then((users) => {
        res.render("home", {
          users,
          helpers: {
            avatar: (name) => name.split("")[0],
          },
        });
      })
      .catch((err) => {
        console.error(err);
        res.render("home", { users: [] });
      });
  } else res.redirect("/login");
});

router.get("/login", (req, res) => {
  if (req.session.logedIn) res.redirect("/");
  else res.render("login");
});

router.post("/login", loginValidation, (req, res) => {
  const err = validationResult(req).array();
  if (err.length > 0) res.render("login", { error: err[0].msg });
  else {
    const data = matchedData(req, {
      onlyValidData: true,
      includeOptionals: false,
    });
    loginHelper(data)
      .then((response) => {
        if (response.success) {
          req.session.logedIn = true;
          req.session.admin = response.admin;
          req.session.id = data.email;
          res.redirect("/");
        } else res.render("login", { error: response.message });
      })
      .catch((error) => {
        console.error(error);
        res.render("login", { error: "Something went wrong, try again" });
      });
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logedIn) res.redirect("/");
  else res.render("signup");
});

router.post("/signup", signupValidation, (req, res) => {
  const err = validationResult(req).array();
  if (err.length > 0) res.render("signup", { error: err[0].msg });
  else {
    const data = matchedData(req, {
      onlyValidData: true,
      includeOptionals: false,
    });
    signupHelper(data)
      .then((response) => {
        if (response.success) {
          req.session.logedIn = true;
          req.session.admin = false;
          req.session.id = data.email;
          res.redirect(303, "/");
        } else res.render("signup", { error: response.message });
      })
      .catch((error) => {
        console.error(error);
        res.render("signup", { error: "Something went wrong, try again" });
      });
  }
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;
