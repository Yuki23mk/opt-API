// C:\Users\sayu0\OptiOil-API\pages\api\product-usage.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const productUsageData = await prisma.productUsage.findMany();
      res.status(200).json(productUsageData);
    } catch (error) {
      console.error("DBから製品使用量データの取得に失敗:", error);
      res.status(500).json({ message: "DBからデータの取得に失敗", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
