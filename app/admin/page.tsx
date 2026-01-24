
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import Link from "next/link";
import AdminCharacterForm from "./AdminChatacterForm";
import NavBar from "../components/NavBar";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen text-white pt-16 pb-24">
      {/* Modern background */}
      <div className="fixed inset-0 -z-10 bg-black" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(220,38,38,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="fixed inset-0 -z-10 bg-black" />

      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header card */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-2xl">
          <div className="p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">Admin Panel</p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">
                Manage Okatsu Content
              </h1>
              <p className="text-xs text-zinc-400 mt-2">
                Logged in as <span className="text-zinc-200">{user.username}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">

              {/* optional “view site”/future action slot */}
              <span className="hidden sm:inline-flex text-xs text-zinc-500 px-3 py-2 rounded-full border border-white/10 bg-white/5">
                Secure Admin Area
              </span>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
          {/* Character form card wrapper */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Add / Update Characters</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Create new characters and keep details consistent.
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <AdminCharacterForm />
            </div>
          </div>

          {/* Coming soon card */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-2xl">
            <div className="px-5 sm:px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Coming Soon</h2>
              <p className="text-xs text-zinc-400 mt-1">
                More tools to manage your content.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <ul className="space-y-3 text-sm">
                {[
                  "Manage anime list (add / edit / delete)",
                  "Feature certain shows on the homepage",
                  "Review recent activity and reports",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600/20 text-red-200 border border-red-500/20 text-xs">
                      ✓
                    </span>
                    <span className="text-zinc-200">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <p className="text-xs text-zinc-400">
                  Tip: keep character images consistent (same aspect ratio) so cards
                  look clean across the site.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions (mobile-friendly) */}
        <div className="mt-6 flex sm:hidden">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center text-sm px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
