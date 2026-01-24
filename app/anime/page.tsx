export const runtime = "nodejs";

import prisma from "@/app/lib/prisma";
import AnimePageClient from "./AnimePageClient";

export default async function AnimePage() {
  const anime = await prisma.anime.findMany({
    select: {
      id: true,
      title: true,
      genre: true,
      image: true,
      format: true,
    },
    orderBy: { title: "asc" },
  });

  return <AnimePageClient anime={anime} />;
}
