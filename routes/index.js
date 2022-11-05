const express = require("express");
const { validationResult, matchedData } = require("express-validator");

const signupValidation = require("../middlewares/validators/signupValidation");
const { signupHelper } = require("../helpers");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
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
        if (response.success) res.redirect("/");
        else res.render("signup", { error: response.message });
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
