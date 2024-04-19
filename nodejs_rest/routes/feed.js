const express = require("express");
const { getFeed } = require("../controller/feed");

const router = express.Router();

router.get("/feed", getFeed);

module.exports = router;
