import express from 'express';
import { exampleController } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', exampleController);

export default router;
