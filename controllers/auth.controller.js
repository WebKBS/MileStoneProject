const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

const getSignup = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);
  console.log(sessionData);
  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
};

const signup = async (req, res, next) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  // 유효성 검사
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"]) //키 문자열 검사로 해야함
  ) {
    console.log("회원가입 실패");
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "유효성 실패!",
        ...enteredData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  // user인스턴스 생성후 데이터 받아서 클래스로 전달
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "이미 사용중인 아이디 입니다.",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      //res.render()
      return;
    }

    // 인스턴스 전달후 user 클래스 매서드 실행
    await user.signup();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  // 회원가입 완료후 로그인 페이지로 리다이렉트
  res.redirect("/login");
};

const getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  const sessionErrorData = {
    errorMessage: "이메일이 일치하지 않습니다.",
    email: user.email,
    password: user.password,
  };

  // 이메일이 일치하지 않을때
  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    console.log("이메일 틀림");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  // 비밀번호가 일치하지 않을때
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    console.log("패스워드 틀림");
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

const logout = (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
