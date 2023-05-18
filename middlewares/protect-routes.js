// 라우트 전체 보호!
const protectRoutes = (req, res, next) => {
  // isAuth가 아니라면
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  // 시작 라우트 /admim 과 isAdmin이거나 isAdmin이 아니라면
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }

  next();
};

module.exports = protectRoutes;
