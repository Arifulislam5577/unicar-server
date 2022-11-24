import orderModel from "../models/orderModel.js";
import expressAsync from "express-async-handler";

// CREATE ORDER
export const createOder = expressAsync(async (req, res) => {
  const { productInfo, buyerInfo } = req.body;

  const order = new orderModel({ productInfo, buyerInfo });
  const newOrder = await order.save();
  if (!newOrder) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(201).json({ message: "Order created successfully" });
});

// GET ORDERS
export const getOders = expressAsync(async (req, res) => {
  const orders = await orderModel
    .find({
      buyerInfo: req.query.userId,
    })
    .populate("buyerInfo productInfo");

  res.status(200).json(orders);
});

// UPDATE ORDER
export const updateOder = expressAsync(async (req, res) => {
  const order = await orderModel.findByIdAndUpdate(
    req.params.id,
    { isPaid: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }
  return res.status(200).json({ message: "Order update successfull" });
});
