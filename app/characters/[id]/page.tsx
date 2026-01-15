// app/characters/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prisma";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  if (!id) return notFound();

  const character = await prisma.character.findUnique({
    where: { id },
    include: { anime: true },
  });

  if (!character) return notFound();

  const anime = character.anime;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <Link href="/" className="hover:text-red-300">
            ← Home
          </Link>
        </div>

        {/* Header: image + main info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-64 h-72 md:h-80 rounded-2xl overflow-hidden border border-zinc-800">
            <Image
              src={character.image || "/Characters/placeholder.png"}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover object-center"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold">
              {character.name}
            </h1>

            {character.role && (
              <p className="text-sm text-zinc-300">{character.role}</p>
            )}

            {anime && (
              <p className="text-sm text-zinc-400">
                From{" "}
                <Link
                  href={`/anime/${anime.id}`}
                  className="text-red-300 hover:text-red-200"
                >
                  {anime.title}
                </Link>
              </p>
            )}

            {character.desc && (
              <p className="text-sm text-zinc-200 mt-3">
                {character.desc}
              </p>
            )}
          </div>
        </div>

        {/* Stats / strengths / weaknesses */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-200">Stats</h2>
            <p className="text-3xl font-bold text-red-300">
              {character.stats ?? 0}
            </p>
            <p className="text-xs text-zinc-400">
              Overall power rating (your own scale).
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-200">Strengths</h2>
            <p className="text-xs text-zinc-300 whitespace-pre-line">
              {character.strength || "To be added."}
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-2">
            <h2 className="text-sm font-semibold text-zinc-200">Weaknesses</h2>
            <p className="text-xs text-zinc-300 whitespace-pre-line">
              {character.weakness || "To be added."}
            </p>
          </div>
        </div>

        {/* Abilities */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-zinc-200">Abilities</h2>
          <p className="text-xs text-zinc-300 whitespace-pre-line">
            {character.abilities || "Abilities coming soon."}
          </p>
        </div>
      </section>
    </main>
  );
}
