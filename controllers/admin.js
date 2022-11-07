const { ObjectId } = require("mongodb");
const { validationResult, matchedData } = require("express-validator");

const { signupHelper } = require("../helpers");
const { getAllUsers, updateStatus, deleteUser } = require("../helpers/admin");

module.exports = {
  getDashBoard: (req, res) => {
    getAllUsers()
      .then((users) => {
        res.render("admin/index", {
          users,
          user: req.session.user,
        });
      })
      .catch((err) => {
        console.error(err);
        res.render("admin/index", { users: [], user: req.session.user });
      });
  },

  getStatusUpdate: (req, res) => {
    const { id } = req.params;
    const { cStatus } = req.query;
    const status = cStatus === "true";
    if (ObjectId.isValid(id) && ObjectId(id).toString() === id) {
      updateStatus(ObjectId(id), !status)
        .then(() => {
          res.redirect("/admin");
        })
        .catch(() => res.redirect("/admin"));
    } else res.redirect("/admin");
  },

  getDeleteUser: (req, res) => {
    const { id } = req.params;
    if (ObjectId.isValid(id) && ObjectId(id).toString() === id) {
      deleteUser(ObjectId(id))
        .then(() => {
          res.redirect("/admin");
        })
        .catch(() => res.redirect("/admin"));
    } else res.redirect("/admin");
  },

  postNewUser: (req, res) => {
    const err = validationResult(req).array();
    if (err.length > 0) {
      req.session.newUserErr = err[0].msg;
      res.redirect("/admin/add-user");
    } else {
      const data = matchedData(req, {
        onlyValidData: true,
        includeOptionals: false,
      });
      data.status = true;
      signupHelper(data)
        .then((response) => {
          if (response.success) {
            req.session.newUserSucc = "New user created";
            res.redirect(303, "/admin/add-user");
          } else {
            req.session.newUserErr = response.message;
            res.redirect("/admin/add-user");
          }
        })
        .catch((error) => {
          console.error(error);
          req.session.newUserErr = "Something went wrong, try again";
          res.redirect("/add-user");
        });
    }
  },
};
