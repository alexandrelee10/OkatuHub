// app/admin/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import Link from "next/link";
import AdminCharacterForm from "./AdminChatacterForm";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    redirect("/"); // or "/sign-in"
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-blue-950 text-white pt-24 pb-16 px-4">
      <section className="max-w-5xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-xs text-zinc-400 mb-1">
              Admin Panel
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Manage Okatsu Content
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Logged in as{" "}
              <span className="text-zinc-200">{user.username}</span>
            </p>
          </div>

          <Link
            href="/"
            className="text-xs px-3 py-1.5 rounded-full border border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
          {/* Character form */}
          <AdminCharacterForm />

          {/* Placeholder for future admin tools */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-300">
            <h2 className="text-lg font-semibold mb-3">
              Coming Soon
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400">
              <li>Manage anime list (add / edit / delete)</li>
              <li>Feature certain shows on the homepage</li>
              <li>Review recent activity and reports</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
