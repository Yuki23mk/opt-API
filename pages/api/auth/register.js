import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role: 'user',
          status: 'pending'
        }
      });
      res.status(201).json({ message: 'ユーザー登録成功', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'ユーザー登録失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
