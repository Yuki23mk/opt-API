import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'トークンが必要です' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: '無効なトークン' });
  }
}
