/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_AnimeToCharacter" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnimeToCharacter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnimeToCharacter_B_index" ON "_AnimeToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_title_key" ON "Anime"("title");

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToCharacter" ADD CONSTRAINT "_AnimeToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
