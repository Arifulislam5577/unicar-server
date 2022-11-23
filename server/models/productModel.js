import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    usedYear: { type: Number, required: true },
    isSold: { type: Boolean, default: false },
    isAdvertised: { type: Boolean, default: false },
    sellerInfo: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    contactInfo: {
      phone: { type: String, required: true },
      location: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const productModel = model("product", productSchema);

export default productModel;
