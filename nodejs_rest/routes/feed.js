const express = require("express");
const { getFeed } = require("../controller/feed");

const router = express.Router();

router.get("/posts", getFeed);

module.exports = router;
