const User = require("../models/user.model");

const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

const signup = async (req, res) => {
  // user인스턴스 생성후 데이터 받아서 클래스로 전달
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  // 인스턴스 전달후 user 클래스 매서드 실행
  await user.signup();

  // 회원가입 완료후 로그인 페이지로 리다이렉트
  res.redirect("/login");
};

const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
