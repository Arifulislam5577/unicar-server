import express from "express";
import {
  createOder,
  getOders,
  updateOder,
} from "../controllers/orderControllers.js";
import {
  verifyToken,
  verifyTokenAdminOrSellerOrBuyer,
} from "../middlewares/verifyUser.js";
const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(verifyToken, createOder)
  .get(verifyToken, verifyTokenAdminOrSellerOrBuyer, getOders);

orderRouter.route("/:id").patch(verifyToken, updateOder);

export default orderRouter;
