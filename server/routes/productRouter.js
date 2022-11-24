import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import {
  verifyToken,
  verifyTokenAdminOrSeller,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} from "../middlewares/verifyUser.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(verifyToken, verifyTokenAdminOrSeller, createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .patch(verifyToken, verifyTokenAndSeller, updateProduct)
  .delete(verifyToken, verifyTokenAndAdmin, deleteProduct);
export default productRouter;
