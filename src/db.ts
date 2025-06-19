import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined in .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(databaseUrl);
        console.log('Connected to MongoDB');

    } catch (error: unknown) {
        console.error('Failed to connect to MongoDB:');

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }

        process.exit(1);
    }
};

export default connectDB;