import productModel from "../models/productModel.js";
import expressAsync from "express-async-handler";

// CREATE USER
export const createProduct = expressAsync(async (req, res) => {
  const {
    name,
    image,
    description,
    originalPrice,
    newPrice,
    purchaseYear,
    usedYear,
    phoneNumber,
    location,
    conditionType,
    sellerInfo,
  } = req.body;

  const product = new productModel({
    name,
    image,
    description,
    originalPrice,
    newPrice,
    purchaseYear,
    usedYear,
    phoneNumber,
    location,
    conditionType,
    sellerInfo,
  });

  const newProduct = await product.save();

  if (!newProduct) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(201).json({ message: "Product created successfully" });
});
// UPDATE USER
export const updateProduct = expressAsync(async (req, res) => {});
// DELETE USER
export const deleteProduct = expressAsync(async (req, res) => {});
