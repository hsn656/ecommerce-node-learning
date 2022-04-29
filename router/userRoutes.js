const express = require("express");
const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyAdminOrOwner } = require("../middlewares/verifyAdminOrOwner");
const { verifyToken } = require("../middlewares/verifyToken");
const { findByIdAndUpdate } = require("../models/user");
const { UserController } = require("../controllers/userController");

const router = express.Router();

router.put("/:id", verifyToken, verifyAdminOrOwner, UserController.updateById);

router.delete(
  "/:id",
  verifyToken,
  verifyAdminOrOwner,
  UserController.deleteById
);

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

module.exports = router;
