-- DropForeignKey
ALTER TABLE "Square" DROP CONSTRAINT "Square_plantId_fkey";

-- DropForeignKey
ALTER TABLE "Square" DROP CONSTRAINT "Square_raisedBedId_fkey";

-- AlterTable
ALTER TABLE "Square" ALTER COLUMN "plantId" DROP NOT NULL,
ALTER COLUMN "raisedBedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Square" ADD CONSTRAINT "Square_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Square" ADD CONSTRAINT "Square_raisedBedId_fkey" FOREIGN KEY ("raisedBedId") REFERENCES "RaisedBed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
