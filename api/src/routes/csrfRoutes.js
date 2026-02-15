import express from "express";

const router = express.Router();

router.get("/csrf-token", (req, res) => {
  res.cookie("csrfToken", req.csrfToken(), {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ csrfToken: req.csrfToken() });
});

export default router;

/*
important for frontend
axios.post("/api/order", data, {
  headers: { "X-CSRF-Token": csrfToken },
  withCredentials: true
});
*/
