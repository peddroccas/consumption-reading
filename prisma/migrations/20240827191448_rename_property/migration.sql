/*
  Warnings:

  - You are about to alter the column `value` on the `gasMeasures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `value` on the `waterMeasures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "gasMeasures" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "waterMeasures" ALTER COLUMN "value" SET DATA TYPE INTEGER;
