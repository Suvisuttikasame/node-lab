// const Sequelize = require("sequelize");
const { ObjectId } = require("mongodb");
const { getDb } = require("../util/mongo-database");

// const sequelize = require("../util/database");
// const User = require("./user");

// const Product = sequelize.define(
//   "product",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     title: Sequelize.STRING,
//     price: {
//       type: Sequelize.DOUBLE,
//       allowNull: false,
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     paranoid: true,
//     deletedAt: "destroyTime",
//   }
// );

// module.exports = Product;

class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id;
  }
  save() {
    const db = getDb();
    if (this._id) {
      const { _id, ...updatedObject } = this;
      return db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(this._id) },
          { $set: { ...updatedObject } }
        );
    } else {
      return db.collection("products").insertOne(this);
    }
  }

  static findAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findByPk(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next();
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: new ObjectId(prodId) });
  }
}

module.exports = Product;
