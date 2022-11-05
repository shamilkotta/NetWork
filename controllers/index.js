const { validationResult, matchedData } = require("express-validator");

const { getAllUsers, loginHelper, signupHelper } = require("../helpers");

module.exports = {
  getHome: (req, res) => {
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
  },

  postLogin: (req, res) => {
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
            delete response.user.password;
            req.session.user = response.user;
            res.redirect("/");
          } else res.render("login", { error: response.message });
        })
        .catch((error) => {
          console.error(error);
          res.render("login", { error: "Something went wrong, try again" });
        });
    }
  },

  postSignup: (req, res) => {
    const err = validationResult(req).array();
    if (err.length > 0) res.render("signup", { error: err[0].msg });
    else {
      const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
      });
      signupHelper(data)
        .then((response) => {
          delete data.password;
          delete data.confirmPassword;
          if (response.success) {
            req.session.logedIn = true;
            req.session.admin = false;
            req.session.id = data.email;
            req.session.user = data;
            res.redirect(303, "/");
          } else res.render("signup", { error: response.message });
        })
        .catch((error) => {
          console.error(error);
          res.render("signup", { error: "Something went wrong, try again" });
        });
    }
  },
};
