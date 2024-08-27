/*
  Warnings:

  - You are about to drop the column `confirmated` on the `measures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "measures" DROP COLUMN "confirmated",
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
