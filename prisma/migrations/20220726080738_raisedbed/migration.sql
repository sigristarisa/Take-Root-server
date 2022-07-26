-- CreateTable
CREATE TABLE "RaisedBed" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RaisedBed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RaisedBed" ADD CONSTRAINT "RaisedBed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
