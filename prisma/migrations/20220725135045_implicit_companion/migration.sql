/*
  Warnings:

  - You are about to drop the `_CompanionToPlant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompanionToPlant" DROP CONSTRAINT "_CompanionToPlant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanionToPlant" DROP CONSTRAINT "_CompanionToPlant_B_fkey";

-- DropTable
DROP TABLE "_CompanionToPlant";

-- CreateTable
CREATE TABLE "_Companion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Companion_AB_unique" ON "_Companion"("A", "B");

-- CreateIndex
CREATE INDEX "_Companion_B_index" ON "_Companion"("B");

-- AddForeignKey
ALTER TABLE "_Companion" ADD CONSTRAINT "_Companion_A_fkey" FOREIGN KEY ("A") REFERENCES "Companion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Companion" ADD CONSTRAINT "_Companion_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
