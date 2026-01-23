// app/anime/page.tsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import UserAvatar from "../components/UserAvatar";
import NavBar from "../components/NavBar";

export default async function AnimePage() {
  const animeList = await prisma.anime.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 text-white pt-24 pb-16 px-4">        
      <NavBar />
      <section className="max-w-6xl mx-auto space-y-8">        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center items-center">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Explore Anime
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            Browse the shows in your Okatsu library. Later we can filter by
            genre, popularity, or your ratings.
          </p>
        </div>

        {/* Empty state */}
        {animeList.length === 0 && (
          <p className="text-sm text-zinc-400">
            No anime added yet. Seed your database or add some from an admin
            page.
          </p>
        )}

        {/* Grid of anime cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animeList.map((anime) => (
            <article
              key={anime.id}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-md flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-64">
                <Image
                  src={anime.image || "/Anime/placeholder.png"} // optional fallback
                  alt={anime.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {anime.title}
                </h2>
                <p className="text-xs text-zinc-400">
                  {anime.genre} · {anime.ep_count} eps · Season {anime.season}
                </p>
                <p className="text-sm text-zinc-300 line-clamp-3 mt-1">
                  {anime.summary}
                </p>

                <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                  <span>By {anime.creator}</span>
                  <Link
                    href={`/anime/${anime.id}`}
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Footer nav */}

      </section>
    </main>
  );
}
