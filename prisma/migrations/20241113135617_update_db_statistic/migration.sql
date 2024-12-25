-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "total_order" INTEGER NOT NULL,
    "total_revenue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);
