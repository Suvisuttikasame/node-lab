const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routers/admin");
const shopRouter = require("./routers/shop");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.route);

app.use(shopRouter);

//handle page not found error
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
