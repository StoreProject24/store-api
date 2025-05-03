/*
  Warnings:

  - You are about to drop the column `state` on the `Stores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domain]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePublic` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerUrl` to the `Stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `Stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `Stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "pricePublic" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ALTER COLUMN "statusId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Stores" DROP COLUMN "state",
ADD COLUMN     "bannerUrl" TEXT NOT NULL,
ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT NOT NULL,
ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "ProductVariants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sku" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stores_domain_key" ON "Stores"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Stores_email_key" ON "Stores"("email");

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
