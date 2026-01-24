-- AlterTable
ALTER TABLE "Anime" ADD COLUMN     "eps_dur" TEXT,
ADD COLUMN     "format" TEXT,
ADD COLUMN     "producers" TEXT,
ADD COLUMN     "studios" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "bio" TEXT,
    "language" TEXT,
    "siteUrl" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeStaff" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roleGroup" TEXT,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER,

    CONSTRAINT "AnimeStaff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_name_key" ON "Staff"("name");

-- CreateIndex
CREATE INDEX "AnimeStaff_animeId_idx" ON "AnimeStaff"("animeId");

-- CreateIndex
CREATE INDEX "AnimeStaff_staffId_idx" ON "AnimeStaff"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeStaff_animeId_staffId_role_key" ON "AnimeStaff"("animeId", "staffId", "role");

-- AddForeignKey
ALTER TABLE "AnimeStaff" ADD CONSTRAINT "AnimeStaff_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStaff" ADD CONSTRAINT "AnimeStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
