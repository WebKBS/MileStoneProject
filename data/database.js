const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

const connectToDatabase = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
};

const getDb = () => {
  if (!database) {
    throw new Error("데이터베이스 연결 실패.");
  }

  return database;
};

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
