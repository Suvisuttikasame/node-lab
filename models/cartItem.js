const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
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
