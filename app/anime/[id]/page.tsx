// app/anime/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

type AnimeDetailPageProps = {
  params: Promise<{ id: string }>; // 👈 explicitly a Promise
};

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  // ⬇️ THIS is what the error message wants
  const { id } = await params;

  if (!id) return notFound();

  const anime = await prisma.anime.findUnique({
    where: { id },
    include: { character: true }, // relation name from your schema
  });

  if (!anime) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-5xl mx-auto space-y-10">
        {/* Title and main image */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-64 h-64">
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <h1 className="text-4xl font-semibold">{anime.title}</h1>
          <p className="text-sm text-zinc-400">
            {anime.genre} • {anime.ep_count} episodes • Season {anime.season}
          </p>
          <p className="text-zinc-300 max-w-xl">{anime.summary}</p>
        </div>

        {/* Character list */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Characters</h2>

          {anime.character.length === 0 ? (
            <p className="text-center text-zinc-400 text-sm">
              No characters added yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {anime.character.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-800 transition"
                >
                  <div className="relative w-full h-48 mb-3">
                    <Image
                      src={char.image}
                      alt={char.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium">{char.name}</h3>
                  {char.role && (
                    <p className="text-xs text-zinc-400">{char.role}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <Link
            href="/anime"
            className="text-md px-3 py-1.5 rounded-full border border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors"
          >
            Back to Anime
          </Link>
        </div>
      </section>
    </main>
  );
}
