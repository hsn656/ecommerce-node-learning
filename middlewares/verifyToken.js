const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: "you are not authorized" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ msg: "you are not authenticated" });
  }
};

module.exports = { verifyToken };
