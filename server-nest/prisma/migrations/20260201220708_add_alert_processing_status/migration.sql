-- CreateEnum
CREATE TYPE "AlertProcessingStatus" AS ENUM ('IDLE', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "news_alerts" ADD COLUMN     "processing_status" "AlertProcessingStatus" NOT NULL DEFAULT 'IDLE';
