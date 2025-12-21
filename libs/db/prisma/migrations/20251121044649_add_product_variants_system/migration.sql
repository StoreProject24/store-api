/*
  Warnings:

  - You are about to drop the `ProductVariants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariants" DROP CONSTRAINT "ProductVariants_productId_fkey";

-- DropTable
DROP TABLE "ProductVariants";

-- CreateTable
CREATE TABLE "VariantType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "VariantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantCombination" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pricePublic" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "VariantCombination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantCombinationValue" (
    "id" SERIAL NOT NULL,
    "combinationId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,

    CONSTRAINT "VariantCombinationValue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantType" ADD CONSTRAINT "VariantType_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VariantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombination" ADD CONSTRAINT "VariantCombination_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombinationValue" ADD CONSTRAINT "VariantCombinationValue_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombinationValue" ADD CONSTRAINT "VariantCombinationValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "VariantOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
