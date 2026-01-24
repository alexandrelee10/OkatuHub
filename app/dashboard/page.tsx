// app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import UserAvatar from "../components/UserAvatar";
import assets from "../assets/assets";
import Image from "next/image";
import NavBar from "../components/NavBar";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  // Parallel DB calls for speed
  const [bookmarkCount, reviewCount, ratingCount, bookmarks] =
    await Promise.all([
      prisma.bookmark.count({ where: { userId: user.id } }),
      prisma.review.count({ where: { userId: user.id } }),
      prisma.rating.count({ where: { userId: user.id } }),
      prisma.bookmark.findMany({
        where: { userId: user.id },
        include: { anime: true },
        take: 5,
        orderBy: { saveDate: "desc" },
      }),
    ]);

  const memberSince = new Date(user.createdAt).toLocaleDateString();

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white pt-24 pb-16 px-4"
      id="dashboard"
    >
      <section className="max-w-6xl mx-auto space-y-10">
        {/* Top row: Logo + Avatar + Welcome */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo (clickable home) */}
          <Link href="/" aria-label="Back to Okatsu home">
          {/* Add Logo in blue */}
          </Link>

          {/* Avatar */}
          <UserAvatar
            src={user.image}
            name={user.username}
            size={90}
          />

          {/* Welcome text */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Welcome back,{" "}
              <span className="text-blue-300">{user.username}</span>
            </h1>
            <p className="text-sm text-zinc-400">
              Member since{" "}
              <span className="text-zinc-200">{memberSince}</span>
            </p>
          </div>
        </div>

        {/* User stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Bookmarks", value: bookmarkCount },
            { label: "Reviews", value: reviewCount },
            { label: "Ratings", value: ratingCount },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-zinc-900/70 border border-zinc-800 rounded-xl py-3"
            >
              <p className="text-zinc-400 text-xs mb-1">{s.label}</p>
              <p className="text-xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1.4fr]">
          {/* Watchlist */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-lg font-semibold">Your Watchlist</h2>

            {bookmarks.length === 0 ? (
              <p className="text-sm text-zinc-400">
                Nothing bookmarked yet — start exploring!
              </p>
            ) : (
              <ul className="space-y-2">
                {bookmarks.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between bg-zinc-950/60 border border-zinc-800 rounded-lg px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {b.anime.title}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {b.anime.genre}
                      </p>
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

          {/* Right: Placeholder panels */}
          <div className="space-y-4">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-1">
                Recommended
              </h2>
              <p className="text-sm text-zinc-400">
                Recommendations will appear after more activity.
              </p>
            </div>

            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-1">
                Recent Activity
              </h2>
              <p className="text-sm text-zinc-400">
                Reviews and ratings will show here soon.
              </p>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-md px-3 py-1.5 rounded-full border border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
