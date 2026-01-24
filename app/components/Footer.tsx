import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/80 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Okatsu</h3>
            <p className="text-sm text-white/60">
              Anime discovery, characters, and community — no spoilers.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/70">
              Explore
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/anime" className="text-white/70 hover:text-white">
                  Anime
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-white/70 hover:text-white">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Meta */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/70">
              Info
            </h4>
            <p className="text-sm text-white/60">
              Built with Next.js, Prisma, and way too much anime knowledge.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Okatsu</span>
          <span>Not affiliated with AniList</span>
        </div>
      </div>
    </footer>
  );
}
