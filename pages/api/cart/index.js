// C:\Users\sayu0\OptiOil-API\pages\api\cart\index.js

import Cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],
  origin: '*',  // 全てのオリジンを許可
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const { userId } = req.query;
    try {
      const cartItems = await prisma.cart.findMany({
        where: { userId: parseInt(userId) },
        include: { Product: true }
      });
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'カートの取得に失敗しました', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
