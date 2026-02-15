import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "./email.service.js";

export const sendOtpService = async (email) => {
  // generate otp
  const { otp, otpExpires } = generateOtp();

  // find user to be updated
  let user = await User.findOne({ email });

  // update or create
  if (user) {
    if (user.isVerified && user.isPasswordSet) {
      return { status: 400, message: "User already registered" };
    }

    // update OTP
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  } else {
    // create new
    user = await User.create({ email, otp, otpExpires });
  }

  await sendEmail(email, user.name, otp);
  return { status: 200, message: "OTP sent successfully" };
};

export const resendOtpService = async (email) => {
  // generate otp
  const { otp, otpExpires } = generateOtp();

  // find user
  let user = await User.findOne({ email });

  if (user) {
    // if user verified, no OTP resend
    if (user.isVerified && user.isPasswordSet) {
      return { status: 400, message: "User already registered" };
    }

    // update OTP
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  }

  await sendEmail(email, user.name, otp);
  return { status: 200, message: "OTP sent successfully" };
};

export const verifyOtpService = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user) return { status: 404, message: "User not found" };
  if (user.isVerified && user.isPasswordSet) {
    return { status: 400, message: "User already registered" };
  }
  if (user.otp !== otp) return { status: 401, message: "Invalid OTP" };
  if (user.otpExpires < Date.now()) return { status: 400, message: "OTP expired" };

  await user.convertToVerifiedUser();
  return { status: 200, message: "OTP verified successfully" };
};
