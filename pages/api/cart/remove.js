import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { cartItemId } = req.body;
    try {
      await prisma.cart.delete({
        where: { id: cartItemId }
      });
      res.status(200).json({ message: 'カートから商品を削除しました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'カートからの削除に失敗しました', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
