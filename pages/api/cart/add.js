import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;
    try {
      const cartItem = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity
        }
      });
      res.status(201).json({ message: 'カートに商品を追加しました', cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'カートへの追加に失敗しました', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
