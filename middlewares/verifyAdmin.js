const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ msg: "you are not authorized" });
  }
};

module.exports = { verifyAdmin };
