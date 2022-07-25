/*
  Warnings:

  - You are about to drop the `_Companion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companionId` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plantId` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Companion" DROP CONSTRAINT "_Companion_A_fkey";

-- DropForeignKey
ALTER TABLE "_Companion" DROP CONSTRAINT "_Companion_B_fkey";

-- AlterTable
ALTER TABLE "Companion" ADD COLUMN     "companionId" INTEGER NOT NULL,
ADD COLUMN     "plantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_Companion";

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companion" ADD CONSTRAINT "Companion_companionId_fkey" FOREIGN KEY ("companionId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
