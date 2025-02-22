/*
  Warnings:

  - The values [ South East Asian] on the enum `ethenicityEnum` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `prompt` to the `OutputImages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "outputImagesStatusEnum" AS ENUM ('pending', 'generated', 'failed');

-- AlterEnum
BEGIN;
CREATE TYPE "ethenicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Models" ALTER COLUMN "ethinicity" TYPE "ethenicityEnum_new" USING ("ethinicity"::text::"ethenicityEnum_new");
ALTER TYPE "ethenicityEnum" RENAME TO "ethenicityEnum_old";
ALTER TYPE "ethenicityEnum_new" RENAME TO "ethenicityEnum";
DROP TYPE "ethenicityEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "outputImagesStatusEnum" NOT NULL DEFAULT 'pending';
