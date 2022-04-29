const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { ProductController } = require("../controllers/productController");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, ProductController.insertOne);

router.post("/many", verifyToken, verifyAdmin, ProductController.insertMany);

router.get("/", ProductController.getAll);

router.get("/:productId", ProductController.getById);

router.put(
  "/:productId",
  verifyToken,
  verifyAdmin,
  ProductController.updateById
);

router.delete(
  "/:productId",
  verifyToken,
  verifyAdmin,
  ProductController.deleteById
);

module.exports = router;
