import USER from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await USER.findById(decoded._doc._id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Invalid Authorization ,No Token");
  }
});

export const verifyTokenAndSeller = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userRole === "seller") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
});

export const verifyTokenAndAdmin = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userRole === "admin") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
});
