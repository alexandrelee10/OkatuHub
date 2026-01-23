// app/trending/page.tsx
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export default async function TrendingPage() {
  const anime = await prisma.anime.findMany({
    orderBy: [
      { bookmarks: { _count: "desc" } },
      { reviews: { _count: "desc" } },
      { ratings: { _count: "desc" } },
      { title: "asc" },
    ],
    include: {
      _count: { select: { bookmarks: true, reviews: true, ratings: true } },
    },
  });

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <section className=" mx-auto">
        <header className="mb-6">
          <h2 className="text-3xl font-semibold text-center">Trending Now</h2>
        </header>

        {anime.length === 0 ? (
          <p className="text-zinc-400">No anime saved yet.</p>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 w-">
            {anime.map((a) => (
              <Link
                key={a.id}
                href={`/anime/${a.id}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition overflow-hidden"
              >
          <div className="relative w-full h-40 sm:h-44 md:h-48">
            <Image
            src={a.image}
            alt={a.title}
            fill
            className="object-cover"
            />
          </div>


                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-medium leading-tight line-clamp-1">
                      {a.title}
                    </h2>
                    <span className="text-[11px] text-zinc-400 shrink-0">
                      🔖 {a._count.bookmarks}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {a.genre} • {a.ep_count} eps • S{a.season}
                  </p>

                  <p className="text-[11px] text-zinc-500">
                    💬 {a._count.reviews} • ⭐ {a._count.ratings}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
