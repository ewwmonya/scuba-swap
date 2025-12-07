/*
  Warnings:

  - Added the required column `content` to the `Dives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "divesId" TEXT;

-- AlterTable
ALTER TABLE "Dives" ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "buddy_instructor" DROP NOT NULL,
ALTER COLUMN "maximum_depth" DROP NOT NULL,
ALTER COLUMN "bottom_time" DROP NOT NULL,
ALTER COLUMN "air_consumption_start_psi_bar" DROP NOT NULL,
ALTER COLUMN "air_consumption_end_psi_bar" DROP NOT NULL,
ALTER COLUMN "average_depth" DROP NOT NULL,
ALTER COLUMN "surface_interval" DROP NOT NULL,
ALTER COLUMN "water_temperature_surface" DROP NOT NULL,
ALTER COLUMN "water_temperature_depth" DROP NOT NULL,
ALTER COLUMN "visibility" DROP NOT NULL,
ALTER COLUMN "currents_conditions" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "divesId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_divesId_fkey" FOREIGN KEY ("divesId") REFERENCES "Dives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_divesId_fkey" FOREIGN KEY ("divesId") REFERENCES "Dives"("id") ON DELETE SET NULL ON UPDATE CASCADE;
