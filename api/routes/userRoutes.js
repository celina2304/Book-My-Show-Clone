import express from 'express';
import { updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/update', verifyToken, updateUser);
router.delete('/delete', verifyToken, deleteUser);

export default router;
