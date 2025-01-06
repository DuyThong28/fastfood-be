/*
  Warnings:

  - Added the required column `type` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('POSITIVE', 'NEGATIVE', 'TOXICs');

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "type" "ReviewType" NOT NULL;
