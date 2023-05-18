const path = require("path");

const express = require("express");
const csrf = require("csurf");

const expressSession = require("express-session");

const createSessionConfig = require("./config/session");

const db = require("./data/database");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public")); // public폴더를 사용하능하게
app.use("/products/assets", express.static("product-data")); //첫번째 파라미터로 url설정된 지정한 문자열로 시작하는 패스이름을 등록 //  저장된 프로덕트 이미지 사용할수 있도록 만듦

app.use(express.urlencoded({ extended: false }));

//세션 사용 csrf 사용하기전 사용
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

// csrf 공격 보호
app.use(csrf());
// csrf를 사용하려면 세션 토큰이 필요함.
app.use(addCsrfTokenMiddleware); // 반드시 패키지 이후에 실행해야한다. HTML input으로 사용해줘야함
app.use(checkAuthStatusMiddleware);

app.use(cartMiddleware);

app.use(authRoutes);
app.use(productRoutes);
app.use(baseRoutes);
app.use(protectRoutesMiddleware);
app.use("/admin", adminRoutes); // /admin으로 시작하는 경로만

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    //데이터베이스 연결되면 호출
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
    console.log("데이터베이스 연결실패!!");
  });
