const express = require("express");

const { getDashBoard } = require("../controllers/admin");

const router = express.Router();

router.get("/", getDashBoard);

module.exports = router;
