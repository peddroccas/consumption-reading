-- AlterTable
ALTER TABLE "gasMeasures" ADD COLUMN     "confirmated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "waterMeasures" ADD COLUMN     "confirmated" BOOLEAN NOT NULL DEFAULT false;
