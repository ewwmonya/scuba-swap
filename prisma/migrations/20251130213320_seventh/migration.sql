/*
  Warnings:

  - You are about to drop the `DiveTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiveTest" DROP CONSTRAINT "DiveTest_userId_fkey";

-- DropTable
DROP TABLE "DiveTest";

-- CreateTable
CREATE TABLE "DiveTestfordev" (
    "id" TEXT NOT NULL,
    "dive_number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dive_date" TEXT NOT NULL,
    "maximum_depth" TEXT NOT NULL,
    "bottom_time" TEXT NOT NULL,
    "entry_time" TEXT NOT NULL,
    "exit_time" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiveTestfordev_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiveTestfordev" ADD CONSTRAINT "DiveTestfordev_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
