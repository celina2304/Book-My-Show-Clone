// user model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      match: /^[A-Za-z][A-Za-z\s'-]{1,49}$/,
      required: true,
      minLength: 2,
      maxLength: 50,
      default: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    },
    password: {
      type: String,
      select: false,
      minLength: 8,
      required: false,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      default: null,
    },
    isVerified: { type: Boolean, default: false, required: true },
    isPasswordSet: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    contact: { type: String, match: /^[0-9]{10}$/ },
  },
  {
    timestamps: true,
    methods: {
      async convertToVerifiedUser() {
        this.isVerified = true;
        this.otp = undefined;
        this.otpExpires = undefined;
        await this.save();
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
