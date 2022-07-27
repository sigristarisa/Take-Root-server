/*
  Warnings:

  - Made the column `userId` on table `RaisedBed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `raisedBedId` on table `Square` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RaisedBed" DROP CONSTRAINT "RaisedBed_userId_fkey";

-- DropForeignKey
ALTER TABLE "Square" DROP CONSTRAINT "Square_raisedBedId_fkey";

-- AlterTable
ALTER TABLE "RaisedBed" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Square" ALTER COLUMN "raisedBedId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RaisedBed" ADD CONSTRAINT "RaisedBed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Square" ADD CONSTRAINT "Square_raisedBedId_fkey" FOREIGN KEY ("raisedBedId") REFERENCES "RaisedBed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
