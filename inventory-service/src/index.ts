import express from 'express';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import { createPublisher } from './utils/rabbit';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v1/products', productsRouter);

const port = process.env.PORT || 4100;
app.listen(port, async () => {
  await createPublisher(); // init rabbit publisher stub
  console.log(`Inventory service listening on ${port}`);
});
