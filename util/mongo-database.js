const { MongoClient } = require("mongodb");

const url = "mongodb://root:root@localhost:27017/";
const client = new MongoClient(url);

module.exports = client;
