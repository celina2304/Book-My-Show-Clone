import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.js";
import config from "../config/config.js";


const razorpay = new Razorpay({
  key_id: config.razorpay.key_id,
  key_secret: config.razorpay.key_secret,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", config.razorpay.key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid payment signature" });
  }

  const payment = await razorpay.payments.fetch(razorpay_payment_id);

  const newPayment = await Payment.create({
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount: payment.amount,
    receiptId: payment.notes.receipt_id || "auto-generated-receipt-id",
    status: payment.status,
    email: payment.email, 
  });

  res.json({ success: true, receipt: newPayment });
};
