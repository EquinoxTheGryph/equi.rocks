/*
  Warnings:

  - You are about to drop the column `subTitle` on the `UserLink` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `UserLink` table. All the data in the column will be lost.
  - Added the required column `content` to the `UserLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `UserLink` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserLinkType" AS ENUM ('LINK', 'TITLE', 'DESCRIPTION', 'CUSTOM');

-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "subTitle",
DROP COLUMN "url",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type" "UserLinkType" NOT NULL DEFAULT 'LINK';
