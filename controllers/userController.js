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
    const users = await User.findById(req.params.userId).select({
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
      req.params.userId,
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
    const result = await User.findByIdAndDelete(req.params.userId);
    if (result) res.status(200).json({ msg: "user has been deleted" });
    else throw new Error("no such user");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getStats = async (req, res) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  try {
    let stats = await User.aggregate([
      {
        $match: { createdAt: { $gte: date } },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports.UserController = {
  getAll,
  getById,
  updateById,
  deleteById,
  getStats,
};
