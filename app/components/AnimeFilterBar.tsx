"use client";

import React from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

type Option = { label: string; value: string };

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Any",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  return (
    <div className="w-full min-w-[160px] dark:text-black">
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl bg-white/5 border border-white/10 text-zinc-200
                     px-4 py-3 pr-10 text-sm outline-none
                     focus:border-white/20 focus:ring-2 focus:ring-white/10"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
          size={18}
        />
      </div>
    </div>
  );
}

export type AnimeFilters = {
  q: string;
  genre: string;
  year: string;
  season: string;
  format: string;
  airingStatus: string;
};

type AnimeFilterBarProps = {
  initialQuery?: string;
  initialGenre?: string;
  initialYear?: string;
  initialSeason?: string;
  initialFormat?: string;
  initialAiringStatus?: string;
  onChange?: (filters: AnimeFilters) => void;
};

export default function AnimeFilterBar({
  initialQuery = "",
  initialGenre = "",
  initialYear = "",
  initialSeason = "",
  initialFormat = "",
  initialAiringStatus = "",
  onChange,
}: AnimeFilterBarProps) {
  const [q, setQ] = React.useState(initialQuery);
  const [genre, setGenre] = React.useState(initialGenre);
  const [year, setYear] = React.useState(initialYear);
  const [season, setSeason] = React.useState(initialSeason);
  const [format, setFormat] = React.useState(initialFormat);
  const [airingStatus, setAiringStatus] = React.useState(initialAiringStatus);

  React.useEffect(() => {
    onChange?.({ q, genre, year, season, format, airingStatus });
  }, [q, genre, year, season, format, airingStatus, onChange]);

  const GENRES: Option[] = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Comedy", value: "Comedy" },
    { label: "Drama", value: "Drama" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Romance", value: "Romance" },
    { label: "Sci-Fi", value: "Sci-Fi" },
    { label: "Thriller", value: "Thriller" },
  ];

  const YEARS: Option[] = Array.from({ length: 30 }, (_, i) => {
    const y = String(new Date().getFullYear() - i);
    return { label: y, value: y };
  });

  const SEASONS: Option[] = [
    { label: "Winter", value: "Winter" },
    { label: "Spring", value: "Spring" },
    { label: "Summer", value: "Summer" },
    { label: "Fall", value: "Fall" },
  ];

  const FORMATS: Option[] = [
    { label: "TV", value: "TV" },
    { label: "Movie", value: "Movie" },
    { label: "OVA", value: "OVA" },
    { label: "Special", value: "Special" },
  ];

  const AIRING: Option[] = [
    { label: "Airing", value: "Airing" },
    { label: "Completed", value: "Completed" },
    { label: "Upcoming", value: "Upcoming" },
  ];

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-white/10 bg-white/5">
        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr_auto] gap-5 items-end">
            {/* Search */}
            <div className="w-full">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search anime..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-zinc-200
                             pl-10 pr-4 py-3 text-sm outline-none
                             focus:border-white/20 focus:ring-2 focus:ring-white/10"
                />
              </div>
            </div>

            <SelectField label="Genres" value={genre} onChange={setGenre} options={GENRES} />
            <SelectField label="Year" value={year} onChange={setYear} options={YEARS} />
            <SelectField label="Season" value={season} onChange={setSeason} options={SEASONS} />
            <SelectField label="Format" value={format} onChange={setFormat} options={FORMATS} />
            <SelectField label="Airing Status" value={airingStatus} onChange={setAiringStatus} options={AIRING} />

            <button
              type="button"
              className="h-[46px] w-[46px] rounded-xl bg-white/5 border border-white/10
                         flex items-center justify-center text-zinc-300
                         hover:bg-white/10 transition"
              aria-label="More filters"
              title="More filters"
              onClick={() => {
                setQ("");
                setGenre("");
                setYear("");
                setSeason("");
                setFormat("");
                setAiringStatus("");
              }}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
