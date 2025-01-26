import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';


//App config
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
//inialize middleware
app.use(express.json());
app.use(cors());



//Api routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});



app.use('/api/user', userRouter);








app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 