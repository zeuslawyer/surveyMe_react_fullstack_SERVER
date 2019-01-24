const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "User not logged in." });
  }
  //else
  next();
};

module.exports = requireLogin;
