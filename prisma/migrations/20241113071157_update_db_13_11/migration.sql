/*
  Warnings:

  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_book_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_book_id_fkey";

-- DropTable
DROP TABLE "Books";

-- DropEnum
DROP TYPE "BookStatus";

-- CreateTable
CREATE TABLE "Foods" (
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
    "status" "FoodStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foods" ADD CONSTRAINT "Foods_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
