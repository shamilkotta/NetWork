const { validationResult, matchedData } = require("express-validator");
const { ObjectId } = require("mongodb");

const {
  getAllUsers,
  loginHelper,
  signupHelper,
  updateInfo,
  getUserById,
} = require("../helpers");

module.exports = {
  getHome: (req, res) => {
    getAllUsers()
      .then((users) => {
        res.render("home", {
          users,
          user: req.session.user,
        });
      })
      .catch((err) => {
        console.error(err);
        res.render("home", { users: [] });
      });
  },

  postLogin: (req, res) => {
    const err = validationResult(req).array();
    if (err.length > 0) {
      req.session.loginErr = err[0].msg;
      res.redirect("/login");
    } else {
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
            response.user.admin = response.admin;
            req.session.user = response.user;
            res.redirect("/");
          } else {
            req.session.loginErr = response.message;
            res.redirect("/login");
          }
        })
        .catch((error) => {
          console.error(error);
          req.session.loginErr = "Something went wrong, try again";
          res.redirect("/login");
        });
    }
  },

  postSignup: (req, res) => {
    const err = validationResult(req).array();
    if (err.length > 0) {
      req.session.signupErr = err[0].msg;
      res.redirect("/signup");
    } else {
      const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
      });
      signupHelper(data)
        .then((response) => {
          delete data.password;
          delete data.confirmPassword;
          data.admin = false;
          if (response.success) {
            req.session.logedIn = true;
            req.session.admin = false;
            req.session.id = data.email;
            req.session.user = data;
            res.redirect(303, "/");
            req.session.signupErr = response.message;
          } else res.redirect("/signup");
        })
        .catch((error) => {
          console.error(error);
          req.session.signupErr = "Something went wrong, try again";
          res.redirect("/signup");
        });
    }
  },

  postInfo: (req, res) => {
    let err = validationResult(req).array();
    err = err.filter(
      (ele) => !["email", "password", "confirmPassword"].includes(ele.param)
    );
    if (err.length > 0) {
      req.session.updateErr = err[0].msg;
      res.redirect("/settings");
    } else {
      const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
      });
      updateInfo(req.session.user.email, data)
        .then(() => {
          req.session.updateSucc = "Updated successfully";
          res.redirect("/settings");
        })
        .catch((error) => {
          console.error(error);
          req.session.updateErr = "Something went wrong, try again";
          res.redirect("/settings");
        });
    }
  },

  getUser: (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(id) && ObjectId(id).toString() === id) {
      getUserById(ObjectId(id))
        .then((response) => {
          if (response.success) res.render("profile", { user: response.user });
          else res.redirect("/");
        })
        .catch(() => res.redirect("/"));
    } else res.redirect("/");
  },
};
