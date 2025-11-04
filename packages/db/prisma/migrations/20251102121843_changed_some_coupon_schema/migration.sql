/*
  Warnings:

  - Made the column `expiresAt` on table `Coupon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "expiresAt" SET NOT NULL;
