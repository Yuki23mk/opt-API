import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'your_jwt_secret_key';  // 本番は環境変数推奨

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'ユーザー名またはパスワードが不正です' });
      }
    } catch (error) {
      res.status(500).json({ message: 'サーバーエラー', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
