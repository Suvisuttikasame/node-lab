const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define(
  "cart",
  {},
  {
    paranoid: true,
    deletedAt: "destroyTime",
  }
);

module.exports = Cart;
