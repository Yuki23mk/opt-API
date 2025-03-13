import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, name, model, location } = req.body;
    try {
      const newMachine = await prisma.machine.create({
        data: {
          userId,
          name,
          model: model || null,        // model が null なら null を挿入
          location: location || null   // location が null なら null を挿入
        }
      });
      res.status(201).json({ message: '機械登録成功', machine: newMachine });
    } catch (error) {
      console.error(error);  // エラー内容を表示
      res.status(500).json({ message: '機械登録失敗', error });
    }
  } else if (req.method === 'GET') {
    try {
      const machines = await prisma.machine.findMany();
      res.status(200).json(machines);
    } catch (error) {
      res.status(500).json({ message: '機械取得失敗', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
