import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import {
  verifyToken,
  verifyTokenAdminOrSeller,
  verifyTokenAndSeller,
} from "../middlewares/verifyUser.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getProducts)
  .post(verifyToken, verifyTokenAdminOrSeller, createProduct);
productRouter
  .route("/:id")
  .patch(verifyToken, verifyTokenAndSeller, updateProduct);
export default productRouter;
