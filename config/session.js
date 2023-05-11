const expressSession = require("express-session");

const mongoDbStore = require("connect-mongodb-session");

// 데이터베이스 세션 설정
const creatSessionStore = () => {
  const MongoDbStore = mongoDbStore(expressSession);

  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
};

// 세션 만들기
const createSessionConfig = () => {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: creatSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2일
    },
  };
};

module.exports = createSessionConfig;
