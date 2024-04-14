const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouter);

app.use(shopRouter);

app.listen(3000);
