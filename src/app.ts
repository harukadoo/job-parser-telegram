import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import helmet from 'helmet';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const startServer = async () => {
  try {
    await connectDB(); 

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to start server due to database connection error.');
    process.exit(1);
  }
};

startServer();