import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    productInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    buyerInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);

export default orderModel;
