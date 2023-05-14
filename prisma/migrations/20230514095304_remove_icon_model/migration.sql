/*
  Warnings:

  - The values [CUSTOM] on the enum `UserLinkType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `link` on the `UserLink` table. All the data in the column will be lost.
  - You are about to drop the `Icon` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserLinkType_new" AS ENUM ('LINK', 'TITLE', 'DESCRIPTION', 'OTHER');
ALTER TABLE "UserLink" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "UserLink" ALTER COLUMN "type" TYPE "UserLinkType_new" USING ("type"::text::"UserLinkType_new");
ALTER TYPE "UserLinkType" RENAME TO "UserLinkType_old";
ALTER TYPE "UserLinkType_new" RENAME TO "UserLinkType";
DROP TYPE "UserLinkType_old";
ALTER TABLE "UserLink" ALTER COLUMN "type" SET DEFAULT 'LINK';
COMMIT;

-- DropForeignKey
ALTER TABLE "UserLink" DROP CONSTRAINT "UserLink_icon_fkey";

-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "link",
ADD COLUMN     "url" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "Icon";
