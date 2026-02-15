import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import hpp from "hpp";
import csrf from "csurf";

// Global rate limiter
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  limit: 100, // 100 requests per 15 mins per IP
  standardHeaders: "draft-8", // adds RateLimit-* headers
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests. Please try again later.",
  },
});

let securityMiddleware = [];

// production only
securityMiddleware.push(helmet()); // Security headers
securityMiddleware.push(xssClean()); // Prevent Cross-Site Scripting
securityMiddleware.push(mongoSanitize()); // Prevent NoSQL injection
securityMiddleware.push(hpp()); // HTTP Parameter Pollution attacks
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  },
});
securityMiddleware.push(csrfProtection); // Cross-Site Request Forgery
// securityMiddleware.push(rateLimiter); // Global rate limiter

export default securityMiddleware;
