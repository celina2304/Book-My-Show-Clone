import User from "../models/user.js";
import bcrypt, { genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import emailjs from "@emailjs/nodejs";
// configs
import config from "../config/config.js";

// utils
import { loadTemplate } from "../utils/loadTemplate.js";

// services
import generateToken from "../utils/generateToken.js";
import { sendGmail } from "../services/mailService.js";

// const html_base = loadTemplate("otp", {
//   appName: "Book my show clone",
//   appShort: "BMS",
//   ticketId: Math.floor(Math.random() * 900000) + 100000,
//   userName: user.name || "User",
//   expiryMinutes: 10,
//   supportEmail: "celina2304dev@proton.me",
//   maskedEmail: email,
//   year: new Date().getFullYear(),
//   // actionUrl: "https://myapp.com/verify",
//   requestIp: "127.0.0.1" || "unknown",
//   d1: otp[0],
//   d2: otp[1],
//   d3: otp[2],
//   d4: otp[3],
//   d5: otp[4],
//   d6: otp[5],
// });

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Only 1 DB call here → no need to exclude password because we don't use password further
    let user = await User.findOne({ email }).select("email isVerified otp otpExpires");
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user?.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    // Update existing OR create a new user in ONE place
    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        email,
        otp,
        otpExpires,
      });
    }

    // Load email template
    const html = loadTemplate("otp", {
      appName: "Book my show clone",
      appShort: "BMS",
      ticketId: Math.floor(Math.random() * 900000) + 100000,
      userName: user?.name || "User",
      expiryMinutes: 10,
      supportEmail: "celina2304dev@proton.me",
      maskedEmail: email,
      year: new Date().getFullYear(),
      d1: otp[0],
      d2: otp[1],
      d3: otp[2],
      d4: otp[3],
      d5: otp[4],
      d6: otp[5],
    });

    // Send mail
    // await sendGmail({
    //   to: email,
    //   subject: "Your OTP for Account Verification",
    //   html,
    // });

    await emailjs
      .send(
        "service_b5zq6r7",
        "template_mnm7cto",
        {
          appName: "Book my show clone",
          appShort: "BMS",
          ticketId: Math.floor(Math.random() * 900000) + 100000,
          userName: user.name || "User",
          expiryMinutes: 10,
          supportEmail: "celina2304dev@proton.me",
          maskedEmail: email,
          year: new Date().getFullYear(),
          d1: otp[0],
          d2: otp[1],
          d3: otp[2],
          d4: otp[3],
          d5: otp[4],
          d6: otp[5],
        },
        {
          publicKey: "yniLOTFdg8vEh603L",
          privateKey: "LAEfFuxPq-GoI7tGCGY3B", // optional, highly recommended for security reasons
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOtp:", error); // Easier debugging
    return res.status(500).json({ message: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Fetch only required fields to reduce load
    const user = await User.findOne({ email }).select(
      "isVerified password name"
    );
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (user.password || user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate OTP & expiry
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    // Update OTP in one go
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { new: true, select: "-password" } // Don't fetch password back
    );

    // Prepare email HTML in memory
    const html = loadTemplate("otp", {
      appName: "Book my show clone",
      appShort: "BMS",
      ticketId: Math.floor(Math.random() * 900000) + 100000,
      userName: user.name || "User",
      expiryMinutes: 10,
      supportEmail: "celina2304dev@proton.me",
      maskedEmail: email,
      year: new Date().getFullYear(),
      d1: otp[0],
      d2: otp[1],
      d3: otp[2],
      d4: otp[3],
      d5: otp[4],
      d6: otp[5],
    });

    // Fire email
    await sendGmail({
      to: email,
      subject: "Resend OTP | Gmail OAuth2",
      html,
    });

    res.status(200).json({
      message: "OTP sent successfully",
      userId: updatedUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Fetch only what's needed
    const user = await User.findOne({ email }).select(
      "otp otpExpires isVerified"
    );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP found, resend OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update only necessary fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find only verified user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Verify OTP first" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    if (user.password) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const salt = genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Update fields
    user.name = name || user.name;
    user.password = hashedPassword;
    user.payments = user.payments || [];
    await user.save();

    // Set cookie with JWT
    res.cookie("authToken", generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).select(
      "password isVerified name email"
    );

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Ensure the user completed OTP verification and registration
    if (!existingUser.isVerified || !existingUser.password) {
      return res
        .status(400)
        .json({ message: "Please complete signup before logging in" });
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
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
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
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
  } catch (err) {
    return res.status(500).json({
      message: "Error during signout",
      error: err.message,
    });
  }
};
