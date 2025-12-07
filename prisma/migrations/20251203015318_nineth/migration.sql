/*
  Warnings:

  - You are about to drop the column `entry_time` on the `DiveTestfordev` table. All the data in the column will be lost.
  - You are about to drop the column `exit_time` on the `DiveTestfordev` table. All the data in the column will be lost.
  - Added the required column `divelogId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `DiveTestfordev` table without a default value. This is not possible if the table is not empty.
  - Added the required column `divelogId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "divelogId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DiveTestfordev" DROP COLUMN "entry_time",
DROP COLUMN "exit_time",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "divelogId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_divelogId_fkey" FOREIGN KEY ("divelogId") REFERENCES "DiveTestfordev"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_divelogId_fkey" FOREIGN KEY ("divelogId") REFERENCES "DiveTestfordev"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
