const { MongoClient } = require("mongodb");

const url = "mongodb://root:root@localhost:27017/";
const dbName = "shop";
let _db;
const mongoConnect = (cb) => {
  const client = new MongoClient(url);
  client.connect().then((c) => {
    _db = client.db(dbName);
    cb();
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("no db instance!");
};

module.exports = {
  mongoConnect,
  getDb,
};
