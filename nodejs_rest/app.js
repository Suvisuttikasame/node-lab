const express = require("express");
const bodyParser = require("body-parser");

const feedRouter = require("./routes/feed");

const app = express();
app.use(bodyParser.json());

app.use("/feed", feedRouter);

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
