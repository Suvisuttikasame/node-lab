const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define(
  "cartItem",
  {
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    deletedAt: "destroyTime",
  }
);

module.exports = CartItem;
