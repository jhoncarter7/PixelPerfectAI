-- CreateEnum
CREATE TYPE "modelTrainingStatusEnum" AS ENUM ('pending', 'completed', 'failed');

-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "modelTrainingStatusEnum" NOT NULL DEFAULT 'pending',
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiRequestId" TEXT;

-- CreateIndex
CREATE INDEX "Models_falAiRequestId_idx" ON "Models"("falAiRequestId");

-- CreateIndex
CREATE INDEX "OutputImages_falAiRequestId_idx" ON "OutputImages"("falAiRequestId");
