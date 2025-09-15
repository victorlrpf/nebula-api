import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prismaClient';
import { redis } from '../utils/redisClient';
import { publishEvent } from '../utils/rabbit';

const router = Router();

const productSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative()
});

router.post('/', async (req, res) => {
  try {
    const body = productSchema.parse(req.body);
    const prod = await prisma.product.create({ data: body });
    // invalidate cache
    await redis.del('products:all');
    // publish event
    await publishEvent({ type: 'product.created', data: { id: prod.id, sku: prod.sku }});
    res.status(201).json(prod);
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cached = await redis.get('products:all');
    if (cached) return res.json(JSON.parse(cached));
    const all = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }});
    await redis.set('products:all', JSON.stringify(all), 'EX', 60); // cache 60s
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: (err as any).message });
  }
});

export default router;
