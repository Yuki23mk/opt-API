import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, products, totalAmount } = req.body;
    try {
      const order = await prisma.order.create({
        data: {
          userId,
          products: JSON.stringify(products),
          totalAmount,
          status: 'pending'
        }
      });
      res.status(201).json({ message: '注文が完了しました', order });
    } catch (error) {
      res.status(500).json({ message: '注文処理失敗', error });
    }
  } else if (req.method === 'GET') {
    try {
      const orders = await prisma.order.findMany();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: '注文取得失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
