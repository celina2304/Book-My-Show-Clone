import crypto from "crypto";

export const generateOtp = () => {
  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return { otp, otpExpires };
};
