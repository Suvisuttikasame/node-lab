const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("admin", adminRouter);

app.use(shopRouter);

//handle page not found error
app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(3000);
