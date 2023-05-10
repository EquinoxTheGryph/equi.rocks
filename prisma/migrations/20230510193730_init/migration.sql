-- CreateTable
CREATE TABLE "Config" (
    "name" TEXT NOT NULL,
    "data" JSON NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "parent" UUID,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mimeType" TEXT NOT NULL,
    "data" BYTEA,
    "metadata" JSON,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UserLink" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "UserLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Config_name_idx" ON "Config"("name");

-- CreateIndex
CREATE INDEX "File_id_idx" ON "File"("id");

-- CreateIndex
CREATE INDEX "Icon_name_idx" ON "Icon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserLink_title_key" ON "UserLink"("title");

-- CreateIndex
CREATE INDEX "UserLink_id_idx" ON "UserLink"("id");

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_icon_fkey" FOREIGN KEY ("icon") REFERENCES "Icon"("name") ON DELETE SET NULL ON UPDATE CASCADE;
