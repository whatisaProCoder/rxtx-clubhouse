const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).render("not-permitted");
  }
}

const isMember = (req, res, next) => {
  if (req.user.is_member) {
    next();
  } else {
    res.status(401).render("not-permitted");
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    res.status(401).render("not-permitted");
  }
}

module.exports = { isAuth, isMember, isAdmin };