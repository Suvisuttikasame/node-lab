const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRouter = require("./routers/admin");
const shopRouter = require("./routers/shop");
const { get404 } = require("./controllers/errors");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);

app.use(shopRouter);

//handle page not found error
app.use(get404);

app.listen(3000);
