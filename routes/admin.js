const express = require("express");

const { getDashBoard, getStatusUpdate } = require("../controllers/admin");

const router = express.Router();

router.get("/", getDashBoard);

router.get("/status/:id", getStatusUpdate);

module.exports = router;
