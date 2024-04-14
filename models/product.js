const path = require("path");
const fs = require("fs");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    let products = [];
    const p = path.join(__dirname, "../", "data", "product.json");
    fs.readFile(p, (err, content) => {
      if (!err) {
        products = JSON.parse(content);
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    let products = [];
    const p = path.join(__dirname, "../", "data", "product.json");
    fs.readFile(p, (err, content) => {
      if (!err) {
        products = JSON.parse(content);
      }
      cb(products);
    });
  }
};
