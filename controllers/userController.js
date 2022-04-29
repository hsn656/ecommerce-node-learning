const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0, _id: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id).select({
      password: 0,
      _id: 0,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateById = async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "user has been deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.UserController = { getAll, getById, updateById, deleteById };
