/*
  Warnings:

  - You are about to drop the column `book_id` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `book_id` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `food_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_id` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_book_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_book_id_fkey";

-- AlterTable
ALTER TABLE "CartItems" DROP COLUMN "book_id",
ADD COLUMN     "food_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "book_id",
ADD COLUMN     "food_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "book_id",
ADD COLUMN     "food_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
