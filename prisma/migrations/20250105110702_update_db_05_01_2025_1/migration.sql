/*
  Warnings:

  - You are about to drop the column `payment_method` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `payment_url` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "payment_url" TEXT;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "payment_method",
DROP COLUMN "payment_url";
