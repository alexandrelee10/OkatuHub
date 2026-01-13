// app/dashboard/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Load some basic user-related data
  const [bookmarkCount, reviewCount, ratingCount, bookmarks] =
    await Promise.all([
      prisma.bookmark.count({
        where: { userId: user.id },
      }),
      prisma.review.count({
        where: { userId: user.id },
      }),
      prisma.rating.count({
        where: { userId: user.id },
      }),
      prisma.bookmark.findMany({
        where: { userId: user.id },
        include: { anime: true },
        take: 5,
        orderBy: { saveDate: "desc" },
      }),
    ]);

  const memberSince = new Date(user.createdAt).toLocaleDateString();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-6xl mx-auto space-y-8">
        {/* Top: breadcrumb + back home */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link
              href="/"
              className="hover:text-blue-300 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-500">Dashboard</span>
          </div>

          {/* Extra back-to-home button */}
          <Link
            href="/"
            className="text-xs px-3 py-1.5 rounded-full border border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Greeting + stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-1">
              Welcome back, <span className="text-blue-300">{user.username}</span>
            </h1>
            <p className="text-sm text-zinc-400">
              Member since <span className="text-zinc-200">{memberSince}</span>
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-2">
              <p className="text-zinc-400 mb-1">Bookmarks</p>
              <p className="text-lg font-semibold">{bookmarkCount}</p>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-2">
              <p className="text-zinc-400 mb-1">Reviews</p>
              <p className="text-lg font-semibold">{reviewCount}</p>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl px-3 py-2">
              <p className="text-zinc-400 mb-1">Ratings</p>
              <p className="text-lg font-semibold">{ratingCount}</p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
          {/* Left column: Watchlist */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Your Watchlist</h2>
              <span className="text-xs text-zinc-400">
                {bookmarkCount === 0
                  ? "No shows saved yet"
                  : `${bookmarkCount} saved anime`}
              </span>
            </div>

            {bookmarks.length === 0 ? (
              <p className="text-sm text-zinc-400">
                You haven&apos;t bookmarked any anime yet. Start exploring and
                tap the bookmark icon to build your watchlist.
              </p>
            ) : (
              <ul className="space-y-3 text-sm">
                {bookmarks.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-3 bg-zinc-950/60 border border-zinc-800 rounded-xl px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {b.anime.title}
                      </span>
                      <span className="text-xs text-zinc-400 line-clamp-1">
                        {b.anime.genre}
                      </span>
                    </div>
                    <Link
                      href={`/anime/${b.anime.id}`}
                      className="text-xs px-3 py-1 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right column: placeholders for recommendations & activity */}
          <div className="space-y-4">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-2">
                Recommended for You
              </h2>
              <p className="text-sm text-zinc-400">
                Soon this section will show anime based on what you bookmark and
                rate highly.
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-2">
                Recent Activity
              </h2>
              <p className="text-sm text-zinc-400">
                Your latest reviews and ratings will appear here once you start
                interacting with shows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
