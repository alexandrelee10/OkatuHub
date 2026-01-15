/*
  Warnings:

  - You are about to drop the `_AnimeToCharacter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `animeId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToCharacter" DROP CONSTRAINT "_AnimeToCharacter_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToCharacter" DROP CONSTRAINT "_AnimeToCharacter_B_fkey";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "animeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AnimeToCharacter";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
