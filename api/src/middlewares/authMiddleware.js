import { verifyJwt } from "../utils/token.js";

export const authenticatedRoute = (req, res, next) => {
  // JWT verification logic
  try {
    const origin = req.headers.origin || "";

    // If request is from Postman / Thunder / mobile app
    if (!origin) return next();

    csrfProtection(req, res, next);
    const token = req.cookies.authToken;
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
