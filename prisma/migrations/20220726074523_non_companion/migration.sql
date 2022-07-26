-- CreateTable
CREATE TABLE "NonCompanion" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "nonCompanionId" INTEGER NOT NULL,

    CONSTRAINT "NonCompanion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NonCompanion" ADD CONSTRAINT "NonCompanion_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonCompanion" ADD CONSTRAINT "NonCompanion_nonCompanionId_fkey" FOREIGN KEY ("nonCompanionId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
