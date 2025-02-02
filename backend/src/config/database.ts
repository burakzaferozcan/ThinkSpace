import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;