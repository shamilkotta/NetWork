const { MongoClient } = require("mongodb");

const uri = process.env.URI || "mongodb://0.0.0.0:27017";
const dbName = process.env.DBNAME || "network";

const client = new MongoClient(uri);
module.exports.getDb = client.db(dbName);
module.exports.connectDb = () =>
  new Promise((resolve, reject) => {
    client
      .connect()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
