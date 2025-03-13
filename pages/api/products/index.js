import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, description } = req.body;
    try {
      const product = await prisma.product.create({
        data: { name, price, description }
      });
      res.status(201).json({ message: '製品登録成功', product });
    } catch (error) {
      res.status(500).json({ message: '製品登録失敗', error });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: '製品取得失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
