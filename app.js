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
const CartItem = require("./models/cartItem");
const Cart = require("./models/cart");
const Order = require("./models/order");
const OrderIem = require("./models/orderItem");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//relation table
User.hasMany(Product, { constraints: true, onDelete: "CASCADE" });
Product.belongsTo(User);
Cart.hasOne(User);
User.belongsTo(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderIem });
Product.belongsToMany(Order, { through: OrderIem });

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
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
  .then((user) => {
    return user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
    });
  })

  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
