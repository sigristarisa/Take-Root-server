-- CreateTable
CREATE TABLE "Companion" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Companion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanionToPlant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanionToPlant_AB_unique" ON "_CompanionToPlant"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanionToPlant_B_index" ON "_CompanionToPlant"("B");

-- AddForeignKey
ALTER TABLE "_CompanionToPlant" ADD CONSTRAINT "_CompanionToPlant_A_fkey" FOREIGN KEY ("A") REFERENCES "Companion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanionToPlant" ADD CONSTRAINT "_CompanionToPlant_B_fkey" FOREIGN KEY ("B") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
