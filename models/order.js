const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Order = sequelize.define(
  "order",
  {},
  {
    paranoid: true,
    deletedAt: "destroyTime",
  }
);

module.exports = Order;
