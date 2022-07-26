-- CreateTable
CREATE TABLE "Square" (
    "id" SERIAL NOT NULL,
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,
    "raisedBedId" INTEGER NOT NULL,

    CONSTRAINT "Square_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Square" ADD CONSTRAINT "Square_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Square" ADD CONSTRAINT "Square_raisedBedId_fkey" FOREIGN KEY ("raisedBedId") REFERENCES "RaisedBed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
