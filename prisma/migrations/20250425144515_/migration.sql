/*
  Warnings:

  - You are about to drop the column `serviceType` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "serviceType";

-- DropEnum
DROP TYPE "ServiceType";
