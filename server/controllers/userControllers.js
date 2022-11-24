import userModel from "../models/userModel.js";
import expressAsync from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

// CREATE USER
export const createUser = expressAsync(async (req, res) => {
  const { userName, userEmail, userRole } = req.body;

  const isExistUser = await userModel.findOne({ userEmail });
  if (isExistUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new userModel({ userName, userEmail, userRole });

  const newUser = await user.save();

  if (newUser) {
    const token = generateToken(newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } else {
    return res.status(400).json({ message: "Internal server error" });
  }
});

// LOGIN USER
export const loginUser = expressAsync(async (req, res) => {
  const { userEmail } = req.body;

  const isExistUser = await userModel.findOne({ userEmail });
  if (!isExistUser) {
    return res.status(400).json({ message: "Invalid User credentials" });
  } else {
    const token = generateToken(isExistUser);
    console.log(isExistUser);
    return res
      .status(200)
      .json({ message: "User Login successfully", token, user: isExistUser });
  }
});

// UPDATE USER
export const updateUser = expressAsync(async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json({ message: "User Update Successful" });
});
// DELETE USER
export const deleteUser = expressAsync(async (req, res) => {
  const user = await userModel.findOneAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({ message: "User Deleted Success" });
});
