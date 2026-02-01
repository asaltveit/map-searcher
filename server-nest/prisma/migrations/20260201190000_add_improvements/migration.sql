-- CreateTable
CREATE TABLE "improvements" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "improvements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "improvements_user_id_idx" ON "improvements"("user_id");

-- CreateIndex
CREATE INDEX "improvements_text_idx" ON "improvements"("text");
