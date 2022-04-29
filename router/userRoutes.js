const express = require("express");
const { verifyAdminOrOwner } = require("../middlewares/verifyAdminOrOwner");
const { verifyToken } = require("../middlewares/verifyToken");
const { UserController } = require("../controllers/userController");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

router.put(
  "/:userId",
  verifyToken,
  verifyAdminOrOwner,
  UserController.updateById
);

router.delete(
  "/:userId",
  verifyToken,
  verifyAdminOrOwner,
  UserController.deleteById
);

// stats to get monthly registered users in last Year
router.get("/stats", verifyToken, verifyAdmin, UserController.getStats);

router.get("/", UserController.getAll);

router.get("/:userId", UserController.getById);

module.exports = router;
