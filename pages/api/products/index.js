import { PrismaClient } from '@prisma/client';
import { verifyToken, handleError } from '../../lib/utils';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const user = verifyToken(req); // 認証チェック
    if (req.method === 'POST') {
      const { name, price, description } = req.body;
      const product = await prisma.product.create({
        data: { name, price, description }
      });
      res.status(201).json({ message: '製品登録成功', data: product });
    } else if (req.method === 'GET') {
      const products = await prisma.product.findMany();
      res.status(200).json({ message: '取得成功', data: products });
    } else {
      res.status(405).json({ message: '許可されていないメソッドです' });
    }
  } catch (error) {
    handleError(res, error);
  }
}
