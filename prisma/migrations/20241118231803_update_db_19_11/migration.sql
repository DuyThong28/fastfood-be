/*
  Warnings:

  - You are about to drop the column `review_status` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "review_status",
ADD COLUMN     "review_state" "ReviewState" NOT NULL DEFAULT 'UNREVIEW';
