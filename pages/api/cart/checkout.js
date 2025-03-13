import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, addressId, totalAmount } = req.body;
    try {
      const cartItems = await prisma.cart.findMany({ where: { userId } });
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'カートが空です' });
      }

      const order = await prisma.order.create({
        data: {
          userId,
          products: JSON.stringify(cartItems),
          totalAmount,
          status: 'pending'
        }
      });

      await prisma.cart.deleteMany({ where: { userId } });
      res.status(201).json({ message: '注文が確定しました', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '注文確定に失敗しました', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
