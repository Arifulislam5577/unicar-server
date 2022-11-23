import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./server/routes/userRouter.js";
import productRouter from "./server/routes/productRouter.js";
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ROUTES

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, () => {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log(`Database connection successful`);
  }
});

//APP LISTENER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    console.log(`App is running at port ${PORT}`);
  }
});