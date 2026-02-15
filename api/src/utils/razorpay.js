import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_API_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_API_KEY_SECRET,
});
