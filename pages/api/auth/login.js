import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'your_jwt_secret_key';  // 環境変数にするのがベスト

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'ログイン成功', token });
    } else {
      res.status(401).json({ message: 'ユーザー名またはパスワードが不正です' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
