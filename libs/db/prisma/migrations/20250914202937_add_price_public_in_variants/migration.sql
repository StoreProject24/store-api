-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "ProductVariants" ADD COLUMN     "pricePublic" DOUBLE PRECISION NOT NULL DEFAULT 0;
