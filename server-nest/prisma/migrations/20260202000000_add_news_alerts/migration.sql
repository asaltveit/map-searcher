-- CreateEnum
CREATE TYPE "AlertFrequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'MANUAL');

-- CreateTable
CREATE TABLE "news_alerts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "max_articles" INTEGER NOT NULL DEFAULT 20,
    "frequency" "AlertFrequency" NOT NULL DEFAULT 'MANUAL',
    "last_run_at" TIMESTAMP(3),
    "next_run_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "default_lat" DOUBLE PRECISION,
    "default_lng" DOUBLE PRECISION,
    "default_zoom" INTEGER DEFAULT 10,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- AlterTable: Add alert_id to news_articles
ALTER TABLE "news_articles" ADD COLUMN "alert_id" TEXT;

-- Make workflow_id nullable (articles can now belong to alerts instead)
ALTER TABLE "news_articles" ALTER COLUMN "workflow_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "news_alerts_user_id_idx" ON "news_alerts"("user_id");

-- CreateIndex
CREATE INDEX "news_alerts_next_run_at_is_active_idx" ON "news_alerts"("next_run_at", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_user_id_key" ON "user_preferences"("user_id");

-- CreateIndex for alert_id on news_articles
CREATE INDEX "news_articles_alert_id_idx" ON "news_articles"("alert_id");

-- CreateIndex: Unique constraint for alert + url (prevent duplicates per alert)
CREATE UNIQUE INDEX "news_articles_alert_id_url_key" ON "news_articles"("alert_id", "url");

-- AddForeignKey
ALTER TABLE "news_alerts" ADD CONSTRAINT "news_alerts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "news_alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
