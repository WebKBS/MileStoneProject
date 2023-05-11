// csrf 보호 함수
const addCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // locals를 사용해서 전체 보호
  next();
};

module.exports = addCsrfToken;
