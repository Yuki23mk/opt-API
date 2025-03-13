import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { orderId } = req.body;
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'cancelled' }
      });
      res.status(200).json({ message: '注文キャンセル成功', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: '注文キャンセル失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
