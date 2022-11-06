const express = require("express");

const { getAllUsers } = require("../helpers/index");

const router = express.Router();

router.get("/", (req, res) => {
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
});

module.exports = router;
