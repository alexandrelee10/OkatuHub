import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || "").trim();
  const hasQuery = query.length > 0;

  // 🔍 DEBUG: this will show you exactly what Next is passing in
  // You can keep or remove later
  console.log("SEARCH PARAMS ON SERVER:", searchParams);

  const animeWhere: Prisma.AnimeWhereInput = hasQuery
    ? {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            genre: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const characterWhere: Prisma.CharacterWhereInput = hasQuery
    ? {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            desc: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [animeList, characterList] = await Promise.all([
    prisma.anime.findMany({
      where: animeWhere,
      orderBy: { title: "asc" },
    }),
    prisma.character.findMany({
      where: characterWhere,
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Search results
          </h1>
          <p className="text-sm text-zinc-400">
            {hasQuery ? (
              <>
                Showing results for{" "}
                <span className="text-zinc-200">"{query}"</span>
              </>
            ) : (
              "No search term provided."
            )}
          </p>

          {/* Optional: inline debug of searchParams */}
          <p className="text-[11px] text-zinc-500">
            Debug searchParams:{" "}
            <span className="break-all">
              {JSON.stringify(searchParams)}
            </span>
          </p>
        </div>

        {/* SHOWS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Shows</h2>
            {hasQuery && (
              <span className="text-xs text-zinc-400">
                {animeList.length} result{animeList.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {animeList.length === 0 ? (
            <p className="text-sm text-zinc-500">
              {hasQuery
                ? "No matching anime found."
                : "Start a search to see matching anime."}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {animeList.map((anime) => (
                <article
                  key={anime.id}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-md flex flex-col"
                >
                  <div className="relative w-full h-52">
                    <Image
                      src={anime.image || "/Anime/placeholder.png"}
                      alt={anime.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      {anime.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-2">
                      {anime.genre} · {anime.ep_count} eps
                    </p>
                    <Link
                      href={`/anime/${anime.id}`}
                      className="mt-2 text-[11px] text-blue-400 hover:text-blue-300"
                    >
                      View details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CHARACTERS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Characters</h2>
            {hasQuery && (
              <span className="text-xs text-zinc-400">
                {characterList.length} result
                {characterList.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {characterList.length === 0 ? (
            <p className="text-sm text-zinc-500">
              {hasQuery
                ? "No matching characters found."
                : "Start a search to see matching characters."}
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {characterList.map((ch) => (
                <article
                  key={ch.id}
                  className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-md flex gap-3 p-3"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={ch.image || "/Characters/placeholder.png"}
                      alt={ch.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col text-sm">
                    <h3 className="font-semibold line-clamp-1">{ch.name}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {ch.role}
                    </p>
                    <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
                      {ch.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
