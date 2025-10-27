import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  },
  razorpay: {
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET,
  },
  gmail: {
    sender_email: process.env.GMAIL_SENDER_EMAIL,
    client_id: process.env.GMAIL_CLIENT_ID,
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    redirect_uri: process.env.GMAIL_REDIRECT_URI,
  },
};
export default config;
