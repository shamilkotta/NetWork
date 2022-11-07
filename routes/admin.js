const express = require("express");

const {
  getDashBoard,
  getStatusUpdate,
  getDeleteUser,
  postNewUser,
} = require("../controllers/admin");
const signupValidation = require("../middlewares/validators/signupValidation");

const router = express.Router();

router.get("/", getDashBoard);

router.get("/status/:id", getStatusUpdate);

router.get("/delete/:id", getDeleteUser);

router.get("/add-user", (req, res) => {
  res.render("admin/new-user-form", {
    user: req.session.user,
    error: req.session.newUserErr,
    success: req.session.newUserSucc,
  });
  req.session.newUserErr = "";
  req.session.newUserSucc = "";
});

router.post("/add-user", signupValidation, postNewUser);

module.exports = router;
