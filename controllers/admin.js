const { ObjectId } = require("mongodb");
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
};
