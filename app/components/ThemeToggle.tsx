"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const active = theme === "system" ? systemTheme : theme;

  const btn = (value: "light" | "dark" | "system", label: string) => {
    const selected = theme === value;
    return (
      <button
        type="button"
        onClick={() => setTheme(value)}
        className={`rounded-xl border px-4 py-2 text-sm transition ${
          selected
            ? "border-red-500/60 bg-red-500/10 text-white"
            : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Appearance</p>
          <p className="text-xs text-white/60">Choose a theme.</p>
        </div>
        <p className="text-xs text-white/50">Active: {active}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {btn("light", "Light")}
        {btn("dark", "Dark")}
        {btn("system", "System")}
      </div>
    </div>
  );
}
