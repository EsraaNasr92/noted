import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/noted_app');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
