const checkAuthStatus = (req, res, next) => {
  // user 체크
  const uid = req.session.uid;
  //console.log(uid);

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin;
  next();
};

module.exports = checkAuthStatus;
