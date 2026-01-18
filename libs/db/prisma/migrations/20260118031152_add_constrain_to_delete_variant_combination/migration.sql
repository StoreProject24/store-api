-- DropForeignKey
ALTER TABLE "VariantCombinationValue" DROP CONSTRAINT "VariantCombinationValue_combinationId_fkey";

-- AddForeignKey
ALTER TABLE "VariantCombinationValue" ADD CONSTRAINT "VariantCombinationValue_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
