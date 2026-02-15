// config file
import dotenv from "dotenv";

// set env path
dotenv.config({
  path: "../.env",
});

// config object including all backend env variables
const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  cors_origin:
    process.env.NODE_ENV === "production"
      ? process.env.CORS_ORIGIN_PROD
      : process.env.CORS_ORIGIN_DEV,
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRES,
  },
  razorpay: {
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET,
  },
  emailjs: {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    public_key: process.env.EMAILJS_PUBLIC_KEY,
    private_key: process.env.EMAILJS_PRIVATE_KEY,
  },
};

export default config;
