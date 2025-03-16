import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, items } = req.body;
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          items: { create: items },
          status: '発注済み'
        }
      });
      res.status(201).json({ message: '発注成功', order });
    } catch (error) {
      res.status(500).json({ message: '発注失敗', error });
    }
  } else if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: '発注取得失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
