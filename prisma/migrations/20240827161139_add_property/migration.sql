/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `waterBills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `gasBills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `waterBills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gasBills" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "waterBills" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "waterBills_date_key" ON "waterBills"("date");
