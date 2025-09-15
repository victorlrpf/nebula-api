import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient';
import { authMiddleware } from '../utils/middleware';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

router.post('/register', async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const hashed = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: { email: parsed.email, password: hashed }
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const access = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refresh = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });

    // store refresh
    await prisma.refreshToken.create({ data: { token: refresh, userId: user.id }});

    // send httpOnly cookie for refresh
    res.cookie('refresh_token', refresh, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({ access });
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies['refresh_token'] || req.body.token;
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    const payload: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
    // validate token stored
    const dbt = await prisma.refreshToken.findUnique({ where: { token }});
    if (!dbt || dbt.revoked) return res.status(401).json({ error: 'invalid refresh' });
    const access = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    res.json({ access });
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
});

router.post('/logout', authMiddleware, async (req: any, res) => {
  // revoke refresh tokens
  const userId = req.user.sub;
  await prisma.refreshToken.updateMany({ where: { userId }, data: { revoked: true }});
  res.clearCookie('refresh_token');
  res.json({ ok: true });
});

export default router;
