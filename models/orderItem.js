const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OrderIem = sequelize.define(
  "orderIem",
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

module.exports = OrderIem;
