import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "../components/NavBar";

// TEMP: replace with real auth later
const MOCK_USER_ID = "dev-user-id";

export default async function FavoritesPage() {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: MOCK_USER_ID },
    include: {
      anime: true,
    },
    orderBy: {
      saveDate: "desc",
    },
  });

  if (!bookmarks) return notFound();

  return (
    <main className="min-h-screen px-4 pt-24 pb-16">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Your Favorites</h1>
          <p className="text-sm text-white/60">
            Anime you’ve saved for later.
          </p>
        </header>

        {bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/70">No favorites yet.</p>
            <Link
              href="/anime"
              className="mt-4 inline-block rounded-full border border-red-500/60 px-4 py-2 text-sm hover:bg-red-500/20"
            >
              Browse Anime
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bookmarks.map(({ anime }) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <div className="relative mb-3 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium">{anime.title}</h3>
                <p className="text-xs text-white/60">{anime.genre}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
