import express from "express";
import { createProduct } from "../controllers/productControllers.js";
import {
  verifyToken,
  verifyTokenAdminOrSeller,
} from "../middlewares/verifyUser.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .post(verifyToken, verifyTokenAdminOrSeller, createProduct);

export default productRouter;
