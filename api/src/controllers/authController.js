import User from "../models/User.js";
import bcrypt, { genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const salt = genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      payments: [],
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(400).json({ message: "User does not exist" });
    bcrypt.compare(password, existingUser.password, (err, same) => {
      if(err) return res.status(500).json({ message: err.message });
      if(!same) return res.status(400).json({ message: "Invalid password" });
      res.status(200).json({ message: "User logged in successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
