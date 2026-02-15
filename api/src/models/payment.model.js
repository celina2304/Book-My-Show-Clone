//  payments model
import mongoose from "mongoose";

/* {
  paymentId: osaijhfisfa,
  orderId: 12344dadd3w,
  amount: 450,
  receiptId: 4rtrg5y445gf5f,
  status: completed,
  email: user email,
  createdAt: curernt date,
}; */

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    receiptId: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
