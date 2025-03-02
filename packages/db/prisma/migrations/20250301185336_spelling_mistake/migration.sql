/*
  Warnings:

  - You are about to drop the column `ethinicity` on the `Models` table. All the data in the column will be lost.
  - Added the required column `ethnicity` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ethnicityEnum" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');

-- AlterTable
ALTER TABLE "Models" DROP COLUMN "ethinicity",
ADD COLUMN     "ethnicity" "ethnicityEnum" NOT NULL;

-- DropEnum
DROP TYPE "ethenicityEnum";
