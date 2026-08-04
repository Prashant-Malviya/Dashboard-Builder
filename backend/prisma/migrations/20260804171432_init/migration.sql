-- CreateTable
CREATE TABLE "dashboards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "widgets" (
    "id" SERIAL NOT NULL,
    "dashboardId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "y" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 300,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 200,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "widgets_dashboardId_idx" ON "widgets"("dashboardId");

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "dashboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
