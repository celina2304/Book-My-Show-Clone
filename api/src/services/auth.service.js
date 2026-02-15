import User from "../models/user.model.js";
import { validateUserInputSignup } from "../utils/validators.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

export const signupService = async (name, email, password) => {
  const error = validateUserInputSignup(name, email, password);
  if (error) return { status: 400, message: error };

  const user = await User.findOne({ email });

  if (!user || !user.isVerified) return { status: 400, message: "Email not verified" };
  if (user.isPasswordSet) return { status: 400, message: "User already registered" };

  user.name = name;
  user.password = await hashPassword(password);
  user.payments = user.payments || [];
  user.isPasswordSet = true;

  console.log("all done here");
  await user.save();

  const token = generateToken(user._id);

  return {
    status: 201,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    message: "User registered successfully",
  };
};
