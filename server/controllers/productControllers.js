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
    category,
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
    category,
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
// GETPRODUCTS

export const getProducts = expressAsync(async (req, res) => {
  const { category, isSold, isAdvertised } = req.query;
  let products = await productModel.find();
  if (category) {
    products = await productModel.find({ category: category });
  }

  if (isSold && isAdvertised) {
    products = await productModel.find({
      isSold: isSold,
      isAdvertised: isAdvertised,
    });
  }

  return res.status(200).json(products);
});

// UPDATE USER
export const updateProduct = expressAsync(async (req, res) => {
  const product = await productModel.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  return res.status(200).json({ message: "Product update successfully" });
});
// DELETE USER
export const deleteProduct = expressAsync(async (req, res) => {});
