/*
  Warnings:

  - Added the required column `payment_method` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'MOMO');

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "payment_url" TEXT;
