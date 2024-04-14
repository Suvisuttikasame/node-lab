const express = require("express");

const app = express();

app.use("/product", (req, res, next) => {
  res.send("<h1>hello from product express</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>hello from express</h1>");
});

app.listen(3000);
