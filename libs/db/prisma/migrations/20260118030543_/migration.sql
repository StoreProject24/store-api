-- DropForeignKey
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_productId_fkey";

-- DropForeignKey
ALTER TABLE "VariantCombination" DROP CONSTRAINT "VariantCombination_productId_fkey";

-- DropForeignKey
ALTER TABLE "VariantCombinationValue" DROP CONSTRAINT "VariantCombinationValue_combinationId_fkey";

-- DropForeignKey
ALTER TABLE "VariantCombinationValue" DROP CONSTRAINT "VariantCombinationValue_optionId_fkey";

-- DropForeignKey
ALTER TABLE "VariantOption" DROP CONSTRAINT "VariantOption_typeId_fkey";

-- DropForeignKey
ALTER TABLE "VariantType" DROP CONSTRAINT "VariantType_productId_fkey";

-- AlterTable
ALTER TABLE "VariantOption" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantType" ADD CONSTRAINT "VariantType_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VariantType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombination" ADD CONSTRAINT "VariantCombination_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombinationValue" ADD CONSTRAINT "VariantCombinationValue_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantCombinationValue" ADD CONSTRAINT "VariantCombinationValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "VariantOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
