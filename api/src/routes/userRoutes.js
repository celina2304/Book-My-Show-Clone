import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { authenticatedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update", authenticatedRoute, updateUser);
router.delete("/delete", authenticatedRoute, deleteUser);

export default router;
