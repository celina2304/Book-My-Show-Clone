// services
import { sendOtpService, resendOtpService, verifyOtpService } from "../services/otp.service.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await sendOtpService(email);

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await resendOtpService(email);

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const result = await verifyOtpService(email, otp);

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
