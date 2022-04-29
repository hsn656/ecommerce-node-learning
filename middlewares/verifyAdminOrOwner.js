const verifyAdminOrOwner = (req, res, next) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ msg: "you are not authorized" });
  }
};

module.exports = { verifyAdminOrOwner };
