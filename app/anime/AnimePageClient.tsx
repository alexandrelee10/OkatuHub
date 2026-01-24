"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimeFilterBar, { AnimeFilters } from "@/app/components/AnimeFilterBar";

type Anime = {
  id: string;
  title: string;
  genre: string;
  image: string;
  format?: string | null;
};

const FALLBACK = "/assets/placeholder.png"; // create this file or use any local image you have

export default function AnimePageClient({ anime }: { anime: Anime[] }) {
  const [filters, setFilters] = useState<AnimeFilters>({
    q: "",
    genre: "",
    year: "",
    season: "",
    format: "",
    airingStatus: "",
  });

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const g = filters.genre.trim().toLowerCase();
    const f = filters.format.trim().toLowerCase();

    return anime.filter((a) => {
      const titleMatch = !q || a.title.toLowerCase().includes(q);
      const genreMatch = !g || (a.genre ?? "").toLowerCase().includes(g);
      const formatMatch = !f || (a.format ?? "").toLowerCase() === f;
      return titleMatch && genreMatch && formatMatch;
    });
  }, [anime, filters]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-red-950 text-white pt-24 pb-16 px-4">
      <section className="mx-auto w-full max-w-6xl space-y-8">
        <h1 className="text-3xl font-semibold">Anime</h1>

        <AnimeFilterBar onChange={setFilters} />

        <p className="text-sm text-white/60">
          Showing <span className="text-white">{filtered.length}</span> /{" "}
          <span className="text-white">{anime.length}</span>
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/70">No anime match your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((a) => {
              const imgSrc =
                typeof a.image === "string" && a.image.trim().length > 0
                  ? a.image
                  : FALLBACK;

              return (
                <Link
                  key={a.id}
                  href={`/anime/${a.id}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <div className="relative mb-3 h-52 w-full overflow-hidden rounded-xl bg-black/30">
                    <Image
                      src={imgSrc}
                      alt={a.title}
                      fill
                      // if you have remote URLs in your DB and haven't configured next.config,
                      // this prevents crashing in dev:
                      unoptimized
                      className="object-cover transition group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>

                  <h3 className="text-sm font-medium">{a.title}</h3>
                  <p className="text-xs text-white/60">{a.genre}</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
