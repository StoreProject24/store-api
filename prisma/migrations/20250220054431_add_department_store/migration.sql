/*
  Warnings:

  - Added the required column `department` to the `Stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "storeId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "video" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Stores" ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "phone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
