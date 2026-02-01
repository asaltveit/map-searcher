-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('PENDING', 'SEARCHING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ADDRESS', 'CROSS_STREET', 'BUSINESS', 'PARK', 'LANDMARK', 'CITY', 'OTHER');

-- CreateTable
CREATE TABLE "news_workflows" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "max_articles" INTEGER NOT NULL DEFAULT 20,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'PENDING',
    "articles_found" INTEGER NOT NULL DEFAULT 0,
    "articles_processed" INTEGER NOT NULL DEFAULT 0,
    "error_count" INTEGER NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "trace_id" TEXT,
    "letta_agent_id" TEXT,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_articles" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "source" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "image_url" TEXT,
    "summary" TEXT,
    "key_points" JSONB,
    "sentiment" TEXT,
    "status" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_locations" (
    "id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "mention" TEXT NOT NULL,
    "mention_type" "LocationType" NOT NULL,
    "context" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "formatted_address" TEXT,
    "confidence" DOUBLE PRECISION,
    "geocode_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "news_workflows_user_id_idx" ON "news_workflows"("user_id");

-- CreateIndex
CREATE INDEX "news_workflows_status_idx" ON "news_workflows"("status");

-- CreateIndex
CREATE INDEX "news_articles_workflow_id_idx" ON "news_articles"("workflow_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_articles_workflow_id_url_key" ON "news_articles"("workflow_id", "url");

-- CreateIndex
CREATE INDEX "article_locations_article_id_idx" ON "article_locations"("article_id");

-- CreateIndex
CREATE INDEX "article_locations_lat_lng_idx" ON "article_locations"("lat", "lng");

-- AddForeignKey
ALTER TABLE "news_workflows" ADD CONSTRAINT "news_workflows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "news_workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_locations" ADD CONSTRAINT "article_locations_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "news_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
