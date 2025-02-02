import express from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3001;

// Connect to Database
connectDB();

app.use(express.json()); 

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('ThinkSpace Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});