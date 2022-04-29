const express = require("express");
const { verifyAdminOrOwner } = require("../middlewares/verifyAdminOrOwner");
const { verifyToken } = require("../middlewares/verifyToken");
const { OrderController } = require("../controllers/orderController");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

router.post("/", verifyToken, verifyAdminOrOwner, OrderController.create);

router.put(
  "/:orderId",
  verifyToken,
  verifyAdminOrOwner,
  OrderController.updateById
);

router.delete(
  "/:orderId",
  verifyToken,
  verifyAdminOrOwner,
  OrderController.deleteById
);

router.get(
  "/:orderId",
  verifyToken,
  verifyAdminOrOwner,
  OrderController.getById
);

router.get("/", verifyToken, verifyAdmin, OrderController.getAll);

module.exports = router;
