const path = require("path");

const express = require("express");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(authRoutes);

db.connectToDatabase()
  .then(() => {
    //데이터베이스 연결되면 호출
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
    console.log("데이터베이스 연결실패!!");
  });
