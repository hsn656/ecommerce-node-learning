const Cart = require("../models/cart");

const create = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const newCart = await newCart.save();
    res.status(200).json(newCart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateById = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const result = await Cart.findByIdAndDelete(req.params.cartId);
    if (result) return res.status(200).json({ msg: "cart has been deleted" });
    else throw new Error("no such cart");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.CartController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
