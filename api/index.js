import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Configs
import config from "./config/config.js";
import connectMongo from "./config/db.config.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/paymentRoutes.js';

// generate refresh token
import generateRefreshHandler from "./utils/generateRefreshGoogle.js";

// generateRefreshHandler();

// Database connection
connectMongo();

const app = express();
const PORT = config.port || 5000;

// Middleware
// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5173", // Replace with your frontend URL
    origin: "https://book-my-show-clone-fawn-mu.vercel.app/",
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
