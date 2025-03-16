import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'password123') {
      const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: '認証失敗' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
