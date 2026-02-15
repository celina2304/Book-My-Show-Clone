// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// config
import config from "../config/config.js";

// services
import { generateToken } from "../utils/token.js";
import { signupService } from "../services/auth.service.js";

// models
import User from "../models/user.model.js";
import { validateUserInputLogin } from "../utils/validators.js";
import { comparePassword } from "../utils/password.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await signupService(name, email, password);
    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    res.cookie("authToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({
      user: result.user,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    console.log(existingUser);

    // Ensure the user completed OTP verification and registration
    if (!existingUser.isVerified || !existingUser.password || !existingUser.isPasswordSet) {
      return res.status(400).json({ message: "Please complete signup before logging in" });
    }

    // Validate password
    const validationError = validateUserInputLogin(email, password);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const isPasswordValid = comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Set auth cookie
    res.cookie("authToken", generateToken(existingUser._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    // message: error.message,
    console.log(error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(200).json({ message: "Already signed out" });
    }

    jwt.verify(token, config.jwt.secret, (err) => {
      // Even if JWT is invalid/expired, still clear cookie
      res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      if (err) {
        return res
          .status(200) // not 400, sign-out should still succeed
          .json({ message: "Signed out (token invalid or expired)" });
      }

      return res.status(200).json({ message: "Successfully signed out" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
