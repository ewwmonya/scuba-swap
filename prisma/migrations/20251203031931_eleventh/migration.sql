/*
  Warnings:

  - Changed the type of `dive_number` on the `DiveTestfordev` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dive_date` on the `DiveTestfordev` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `maximum_depth` on the `DiveTestfordev` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bottom_time` on the `DiveTestfordev` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DiveTestfordev" DROP COLUMN "dive_number",
ADD COLUMN     "dive_number" INTEGER NOT NULL,
DROP COLUMN "dive_date",
ADD COLUMN     "dive_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "maximum_depth",
ADD COLUMN     "maximum_depth" INTEGER NOT NULL,
DROP COLUMN "bottom_time",
ADD COLUMN     "bottom_time" INTEGER NOT NULL;
