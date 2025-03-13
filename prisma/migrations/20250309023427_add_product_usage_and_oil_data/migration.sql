-- CreateTable
CREATE TABLE "productUsage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "usage" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "oilData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "ph" REAL NOT NULL,
    "concentration" REAL NOT NULL
);
