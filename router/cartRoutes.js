const express = require("express");
const { verifyAdminOrOwner } = require("../middlewares/verifyAdminOrOwner");
const { verifyToken } = require("../middlewares/verifyToken");
const { CartController } = require("../controllers/cartController");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

router.post("/", verifyToken, verifyAdminOrOwner, CartController.create);

router.put(
  "/:cartId",
  verifyToken,
  verifyAdminOrOwner,
  CartController.updateById
);

router.delete(
  "/:cartId",
  verifyToken,
  verifyAdminOrOwner,
  CartController.deleteById
);

router.get("/:cartId", verifyToken, verifyAdminOrOwner, CartController.getById);

router.get("/", verifyToken, verifyAdmin, CartController.getAll);

module.exports = router;
