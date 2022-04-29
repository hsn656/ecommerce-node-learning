const Product = require("../models/product");

const insertOne = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const insertMany = async (req, res) => {
  try {
    const newProducts = await Product.insertMany(req.body);
    return res.status(200).json(newProducts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.productId);
    if (result)
      return res.status(200).json({ msg: "product has been deleted" });
    else throw new Error("no such product");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.ProductController = {
  insertMany,
  insertOne,
  getAll,
  getById,
  updateById,
  deleteById,
};
