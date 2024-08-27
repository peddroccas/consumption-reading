/*
  Warnings:

  - You are about to drop the `gasMeasures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `waterMeasures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gasMeasures" DROP CONSTRAINT "gasMeasures_user_id_fkey";

-- DropForeignKey
ALTER TABLE "waterMeasures" DROP CONSTRAINT "waterMeasures_user_id_fkey";

-- DropTable
DROP TABLE "gasMeasures";

-- DropTable
DROP TABLE "waterMeasures";

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "confirmated" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measures_date_key" ON "measures"("date");

-- AddForeignKey
ALTER TABLE "measures" ADD CONSTRAINT "measures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
