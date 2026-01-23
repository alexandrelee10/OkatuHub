"use client"

"use client";

import { useState } from "react";

export default function SearchBox() {
  const [q, setQ] = useState("");

  return (
    <form
      className="flex items-center gap-2 w-full max-w-md"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-3xs rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
      />
    </form>
  );
}
