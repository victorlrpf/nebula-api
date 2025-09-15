import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Auth service listening on ${port}`);
});
