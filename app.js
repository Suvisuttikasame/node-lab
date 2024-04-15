const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//relation table
User.hasMany(Product);

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "dummy",
        email: "dummy@mail.com",
      });
    }
    return Promise.resolve(user);
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
