/*
  Warnings:

  - You are about to drop the column `certification` on the `Dives` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dives" DROP COLUMN "certification",
ALTER COLUMN "equipment_exposure_suit" DROP NOT NULL,
ALTER COLUMN "equipment_tank_type_size" DROP NOT NULL,
ALTER COLUMN "equipment_additional" DROP NOT NULL;
