const Order = require("../models/order");
const { paymentService } = require("../services/paymentService");

const create = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const { stripeErr, stripeRes } = await paymentService.chargeOrder(req, res);
    if (stripeErr) {
      res.status(500).json(stripeErr);
    } else {
      console.log(stripeRes);
      const newOrder = await newOrder.save();
      res.status(200).json(newOrder);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.orderId);
    if (result) return res.status(200).json({ msg: "order has been deleted" });
    else throw new Error("no such order");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.OrderController = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
s;
