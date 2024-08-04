import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import requestRouter from './routes/request.route.js';
import photoRouter from './routes/photo.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('connected to mongodb');
}).catch((err) => {
  console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // sau '*' pentru a permite orice domeniu
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/uploads', express.static('uploads'));

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/request",requestRouter);
app.use("/api/photo",photoRouter);

app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  });
});