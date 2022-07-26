-- DropForeignKey
ALTER TABLE "RaisedBed" DROP CONSTRAINT "RaisedBed_userId_fkey";

-- AlterTable
ALTER TABLE "RaisedBed" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RaisedBed" ADD CONSTRAINT "RaisedBed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
