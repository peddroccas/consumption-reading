-- AlterTable
ALTER TABLE "gasBills" ADD COLUMN     "confirmated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "waterBills" ADD COLUMN     "confirmated" BOOLEAN NOT NULL DEFAULT false;
