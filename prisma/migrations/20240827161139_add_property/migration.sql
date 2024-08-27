/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `waterMeasures` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `gasMeasures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `waterMeasures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gasMeasures" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "waterMeasures" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "waterMeasures_date_key" ON "waterMeasures"("date");
