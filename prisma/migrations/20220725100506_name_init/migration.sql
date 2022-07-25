-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT[] DEFAULT ARRAY['fruit', 'herb', 'vegetable']::TEXT[],
    "seedlingPerSquare" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "imagePerSquare" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);
