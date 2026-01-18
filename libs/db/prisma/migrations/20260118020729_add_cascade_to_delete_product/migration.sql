-- DROP foreign keys existentes si las hubiera
ALTER TABLE "ProductImages" DROP CONSTRAINT IF EXISTS "ProductImages_productId_fkey";
ALTER TABLE "VariantType" DROP CONSTRAINT IF EXISTS "VariantType_productId_fkey";
ALTER TABLE "VariantCombination" DROP CONSTRAINT IF EXISTS "VariantCombination_productId_fkey";
ALTER TABLE "VariantOption" DROP CONSTRAINT IF EXISTS "VariantOption_typeId_fkey";
ALTER TABLE "VariantCombinationValue" DROP CONSTRAINT IF EXISTS "VariantCombinationValue_optionId_fkey";
ALTER TABLE "VariantCombinationValue" DROP CONSTRAINT IF EXISTS "VariantCombinationValue_combinationId_fkey";

-- ALTER TABLE para VariantOption (timestamps y status)
ALTER TABLE "VariantOption"
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Índice único de VariantOption
CREATE UNIQUE INDEX IF NOT EXISTS "VariantOption_typeId_name_key"
ON "VariantOption"("typeId", "name");

-- FOREIGN KEYS con ON DELETE CASCADE

-- Productos -> Imágenes
ALTER TABLE "ProductImages"
ADD CONSTRAINT "ProductImages_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE;

-- Productos -> VariantType
ALTER TABLE "VariantType"
ADD CONSTRAINT "VariantType_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE;

-- Productos -> VariantCombination
ALTER TABLE "VariantCombination"
ADD CONSTRAINT "VariantCombination_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE;

-- VariantType -> VariantOption
ALTER TABLE "VariantOption"
ADD CONSTRAINT "VariantOption_typeId_fkey"
FOREIGN KEY ("typeId") REFERENCES "VariantType"(id) ON DELETE CASCADE;

-- VariantOption -> VariantCombinationValue
ALTER TABLE "VariantCombinationValue"
ADD CONSTRAINT "VariantCombinationValue_optionId_fkey"
FOREIGN KEY ("optionId") REFERENCES "VariantOption"(id) ON DELETE CASCADE;

-- VariantCombination -> VariantCombinationValue
ALTER TABLE "VariantCombinationValue"
ADD CONSTRAINT "VariantCombinationValue_combinationId_fkey"
FOREIGN KEY ("combinationId") REFERENCES "VariantCombination"(id) ON DELETE CASCADE;
