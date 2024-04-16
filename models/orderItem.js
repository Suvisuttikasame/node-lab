const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OrderItem = sequelize.define(
  "orderItem",
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

module.exports = OrderItem;
