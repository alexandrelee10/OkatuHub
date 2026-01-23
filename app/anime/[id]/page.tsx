import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import prisma from "@/app/lib/prisma";
import NavBar from "@/app/components/NavBar";

type AnimeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params;
  if (!id) notFound();

  const anime = await prisma.anime.findUnique({
    where: { id },
    include: { character: true },
  });

  if (!anime) notFound();
  const bannerSrc = anime.image;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <NavBar />
      <section className="relative h-[280px] w-full overflow-hidden">
        <div className=" absolute pt-4 px-4 z-99">
          <Link
            href="/anime"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
            >
            ← Back to Anime
          </Link>
        </div>
        <Image
          src={bannerSrc}
          alt={`${anime.title} banner`}
          fill
          priority
          className="object-cover blur-[2px] scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/15 via-transparent to-red-700/15" />
      </section>

      {/* CONTENT SHEET */}
      <section className="relative -mt-16 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="grid gap-6 md:grid-cols-[220px_1fr]">
            {/* Floating cover */}
            <div className="mx-auto md:mx-0">
              <div className="relative h-[320px] w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="mt-3 flex w-[220px] gap-2">
                <button className="flex-1 rounded-xl bg-red-600/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                  Add to List
                </button>
                <button className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10">
                  ♥
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                  {anime.title}
                </h1>

                <p className="text-sm text-white/70">
                  {anime.genre} • {anime.ep_count} episodes • Season {anime.season}
                </p>
              </div>

              {anime.summary ? (
                <p className="max-w-3xl text-sm leading-6 text-zinc-200 md:text-base">
                  {anime.summary}
                </p>
              ) : (
                <p className="text-sm text-white/60">No summary yet.</p>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  {anime.character.length} characters
                </span>
                {anime.creator ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                    Creator: {anime.creator}
                  </span>
                ) : null}
              </div>

            </div>
          </header>

          <div className="mt-8 border-b border-white/10">
            <div className="flex gap-6 text-sm text-white/70">
              <span className="relative cursor-default pb-3 font-medium text-white">
                Overview
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-red-500" />
              </span>
              <span className="pb-3 hover:text-white/90">Characters</span>
              <span className="pb-3 hover:text-white/90">Stats</span>
              <span className="pb-3 hover:text-white/90">Social</span>
            </div>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Left sidebar cards */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Info
                </p>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Genre</span>
                    <span>{anime.genre}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Episodes</span>
                    <span>{anime.ep_count}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/50">Season</span>
                    <span>{anime.season}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right main content */}
            <section className="space-y-6">
              {/* Characters */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold">Characters</h2>
                  <p className="text-sm text-white/60">{anime.character.length}</p>
                </div>

                {anime.character.length === 0 ? (
                  <p className="text-sm text-white/70">No characters added yet.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {anime.character.map((char) => (
                      <Link
                        key={char.id}
                        href={`/characters/${char.id}`}
                        className="group overflow-hidden rounded-xl border border-white/10 bg-black/20 transition hover:border-white/20 hover:bg-black/10"
                      >
                        <div className="relative h-40 w-full">
                          <Image
                            src={char.image}
                            alt={char.name}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-white">{char.name}</p>
                          <p className="text-xs text-white/60">
                            {char.role ?? "Character"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
