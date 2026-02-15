import express from "express";

import { login, signout, signup } from "../controllers/auth.controller.js";
import { sendOtp, resendOtp, verifyOtp } from "../controllers/otp.controller.js";

// rate limiter only for otp routes
import { rateLimiter } from "../middlewares/security.js";

const router = express.Router();

router.post("/send-otp", rateLimiter, sendOtp);
router.post("/resend-otp", rateLimiter, resendOtp);
router.post("/verify-otp", rateLimiter, verifyOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", signout);

export default router;
