const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};

const signup = (req, res) => {
  // 몽고디비 연결
};

const getLogin = (req, res) => {
  //...
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
