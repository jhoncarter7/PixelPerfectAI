/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `ethenicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ethenicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', ' South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Models" ALTER COLUMN "ethinicity" TYPE "ethenicityEnum_new" USING ("ethinicity"::text::"ethenicityEnum_new");
ALTER TYPE "ethenicityEnum" RENAME TO "ethenicityEnum_old";
ALTER TYPE "ethenicityEnum_new" RENAME TO "ethenicityEnum";
DROP TYPE "ethenicityEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "userId" TEXT NOT NULL;
