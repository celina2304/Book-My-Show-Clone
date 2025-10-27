import express from "express";
import {
  login,
  sendOtp,
  resendOtp,
  signout,
  signup,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

export default router;
