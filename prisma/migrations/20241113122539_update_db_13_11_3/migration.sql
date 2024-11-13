/*
  Warnings:

  - You are about to drop the column `food_id` on the `CartItems` table. All the data in the column will be lost.
  - You are about to drop the column `food_id` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `food_id` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the `Foods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `CartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_food_id_fkey";

-- DropForeignKey
ALTER TABLE "Foods" DROP CONSTRAINT "Foods_category_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_food_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_food_id_fkey";

-- AlterTable
ALTER TABLE "CartItems" DROP COLUMN "food_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "food_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "food_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Foods";

-- DropEnum
DROP TYPE "FoodStatus";

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "entry_price" DECIMAL(65,30) NOT NULL,
    "final_price" DECIMAL(65,30),
    "discountPercentage" INTEGER,
    "discountDate" TIMESTAMP(3),
    "avg_stars" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
