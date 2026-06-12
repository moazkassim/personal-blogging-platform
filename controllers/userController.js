import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//controller function for user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exist or not
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email format &  strong password
    if (!validator.isEmail(email)) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed. Please try again later.",
    });
  }
};
//controller function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exist
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

export { loginUser, registerUser };
