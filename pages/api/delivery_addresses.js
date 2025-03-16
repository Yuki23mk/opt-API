import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, address } = req.body;
    try {
      const delivery = await prisma.deliveryAddress.create({
        data: { userId, address }
      });
      res.status(201).json({ message: '配送先登録成功', delivery });
    } catch (error) {
      res.status(500).json({ message: '配送先登録失敗', error });
    }
  } else if (req.method === 'GET') {
    try {
      const addresses = await prisma.deliveryAddress.findMany();
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: '配送先取得失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
