import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';

// App config
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

// Middleware
app.use(express.json()); // General JSON body parsing
app.use(cors());



// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});
app.use('/api',userRouter)

// Server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});