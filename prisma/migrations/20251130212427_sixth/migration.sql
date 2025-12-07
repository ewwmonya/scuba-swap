/*
  Warnings:

  - You are about to drop the `Dives_test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dives_test" DROP CONSTRAINT "Dives_test_userId_fkey";

-- DropTable
DROP TABLE "Dives_test";

-- CreateTable
CREATE TABLE "DiveTest" (
    "id" TEXT NOT NULL,
    "dive_number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dive_date" TEXT NOT NULL,
    "maximum_depth" TEXT NOT NULL,
    "bottom_time" TEXT NOT NULL,
    "entry_time" TEXT NOT NULL,
    "exit_time" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DiveTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiveTest" ADD CONSTRAINT "DiveTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
