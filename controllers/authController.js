const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    newUser = await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: "email or password is wrong" });

    const unHashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(cryptoJS.enc.Utf8);
    if (unHashedPassword !== req.body.password)
      return res.status(401).json({ message: "email or password is wrong" });

    const { password, ...others } = user._doc;
    const accessToken = jwt.sign(
      { userId: user._id.toString(), isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({ user: others, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.AuthController = { register, login };
