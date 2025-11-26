-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "likeId" INTEGER,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
