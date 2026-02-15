import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// Configs
import config from "./config/config.js";

// Middleware
import securityMiddleware from "./middlewares/security.js";
import loggerMiddleware from "./middlewares/logger.js";

// Routes
import csrfRoutes from "./routes/csrfRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true, // Allow credentials (cookies)
  })
); // CORS
if (process.env.NODE_ENV === "production") {
  app.use(...securityMiddleware); // Security
}
app.use(loggerMiddleware); // Logger
app.use(bodyParser.json()); // Parse JSON
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/csrf-token", csrfRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

export default app;
