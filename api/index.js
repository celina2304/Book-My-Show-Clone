import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';

// Load environment variables
dotenv.config({
    path: "../.env"
});
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello world!"
    })
})
app.use('/api/user', userRoutes);
// app.use('/api/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;