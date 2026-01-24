import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import NavBar from "@/app/components/NavBar";

type CharactersPageProps = {
  searchParams?: {
    q?: string;
    animeId?: string;
  };
};

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
  const q = (searchParams?.q ?? "").trim();
  const animeId = (searchParams?.animeId ?? "").trim();

  const animeList = await prisma.anime.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  const characters = await prisma.character.findMany({
    where: {
      ...(q
        ? {
            name: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {}),
      ...(animeId ? { animeId } : {}),
    },
    include: {
      anime: { select: { id: true, title: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <section className="mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Characters</h1>
          <p className="text-sm text-white/60">
            Search your favorite characters and filter by show.
          </p>
        </header>

        {/* Filters */}
        <form method="GET" className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_280px_auto]">
          <div className="space-y-1">
            <label htmlFor="q" className="text-xs text-white/60">
              Search
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Search character name..."
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-red-500/60"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="animeId" className="text-xs text-white/60">
              Show
            </label>
            <select
              id="animeId"
              name="animeId"
              defaultValue={animeId}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-red-500/60"
            >
              <option value="">All shows</option>
              {animeList.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl border border-red-500/70 bg-red-500/10 px-4 py-2 text-sm font-medium text-white transition hover:border-red-500 hover:bg-red-500/20"
            >
              Apply
            </button>

            <Link
              href="/characters"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
            >
              Reset
            </Link>
          </div>
        </form>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60">
            Showing <span className="text-white">{characters.length}</span>
            {q ? (
              <>
                {" "}
                results for <span className="text-white">“{q}”</span>
              </>
            ) : null}
          </p>
        </div>

        {characters.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/70">No characters found.</p>
            <p className="mt-2 text-sm text-white/50">
              Try a different name or set show to “All shows”.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:ring-offset-2 focus:ring-offset-black"
              >
                <div className="relative mb-3 h-52 w-full overflow-hidden rounded-xl">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-medium">{char.name}</h3>

                  <p className="text-xs text-white/60">
                    {char.anime?.title ?? "Unknown show"}
                  </p>

                  <p className="text-xs text-white/50">
                    {char.role ? char.role : "Character"}
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
