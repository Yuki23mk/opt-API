import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.productUsage.createMany({
    data: [
      { month: "1月", usage: 120 },
      { month: "2月", usage: 150 },
      { month: "3月", usage: 100 },
      { month: "4月", usage: 200 },
    ],
  });

  await prisma.oilData.createMany({
    data: [
      { date: new Date("2025-01-01"), ph: 7.2, concentration: 10 },
      { date: new Date("2025-02-01"), ph: 7.0, concentration: 12 },
      { date: new Date("2025-03-01"), ph: 7.5, concentration: 11 },
    ],
  });
}

main()
  .then(() => console.log("シードデータの追加に成功"))
  .catch((e) => console.error("シードデータの追加に失敗:", e))
  .finally(() => prisma.$disconnect());
