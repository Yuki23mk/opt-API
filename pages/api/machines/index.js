import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, machineName, material, assignedPerson } = req.body;
    try {
      const machine = await prisma.machine.create({
        data: {
          userId,
          machineName,
          material,
          assignedPerson
        }
      });
      res.status(201).json({ message: '機械登録成功', machine });
    } catch (error) {
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
