/*
  Warnings:

  - You are about to drop the column `author` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `Authors` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "author";

-- DropTable
DROP TABLE "Authors";
