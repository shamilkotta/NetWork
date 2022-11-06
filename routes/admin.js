const express = require("express");

const {
  getDashBoard,
  getStatusUpdate,
  getDeleteUser,
} = require("../controllers/admin");

const router = express.Router();

router.get("/", getDashBoard);

router.get("/status/:id", getStatusUpdate);

router.get("/delete/:id", getDeleteUser);

module.exports = router;
