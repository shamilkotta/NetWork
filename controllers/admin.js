const { getAllUsers } = require("../helpers");

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
};
