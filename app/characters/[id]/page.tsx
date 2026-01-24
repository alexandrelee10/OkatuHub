import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type CharacterDetailPageProps = {
  params: Promise<{ id: string }>;
};

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
        {title}
      </h2>
      <div className="text-sm leading-6 text-white/80">{children}</div>
    </section>
  );
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;
  if (!id) return notFound();

  const char = await prisma.character.findUnique({
    where: { id },
    include: {
      anime: { select: { id: true, title: true, image: true, genre: true } },
    },
  });

  if (!char) return notFound();

  const hasExtra =
    !!char.desc || !!char.abilities || !!char.strength || !!char.weakness;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-red-950 text-white pt-24 pb-16 px-4">
      <section className="mx-auto w-full max-w-6xl space-y-10">
        {/* Top nav */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/characters"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            ← Back to Characters
          </Link>

          {char.anime?.id ? (
            <Link
              href={`/anime/${char.anime.id}`}
              className="inline-flex items-center rounded-full border border-red-500/70 bg-red-500/10 px-4 py-2 text-sm font-medium text-white transition hover:border-red-500 hover:bg-red-500/20"
            >
              View Anime →
            </Link>
          ) : null}
        </div>

        {/* Hero */}
        <header className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          {/* Image */}
          <div className="mx-auto lg:mx-0">
            <div className="relative h-80 w-80 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src={char.image ?? "/assets/placeholder.png"}
                alt={char.name}
                fill
                priority
                sizes="(max-width: 768px) 320px, 360px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </div>

            {/* Quick stats card under image */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap gap-2">
                <InfoPill>Show: {char.anime?.title ?? "Unknown"}</InfoPill>
                <InfoPill>Role: {char.role ?? "Character"}</InfoPill>
                {typeof char.stats === "number" ? (
                  <InfoPill>Stats: {char.stats}</InfoPill>
                ) : (
                  <InfoPill>Stats: N/A</InfoPill>
                )}
              </div>

              {char.anime?.genre ? (
                <p className="mt-3 text-xs text-white/55">
                  Genres: {char.anime.genre}
                </p>
              ) : null}
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-white/55">
              {char.anime?.title ?? "Unknown show"}
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              {char.name}
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-6 text-white/75 lg:mx-0 md:text-base">
              {char.desc
                ? char.desc
                : "No description yet. Add a bio in your admin/seed to make this page feel alive."}
            </p>

            {/* Action row */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {char.anime?.id ? (
                <Link
                  href={`/anime/${char.anime.id}`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
                >
                  Go to {char.anime.title}
                </Link>
              ) : null}

              <Link
                href="/anime"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                Browse Anime
              </Link>
            </div>
          </div>
        </header>

        {/* Details sections */}
        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Abilities">
            {char.abilities ? (
              <p>{char.abilities}</p>
            ) : (
              <p className="text-white/60">No abilities added yet.</p>
            )}
          </Section>

          <Section title="Strengths">
            {char.strength ? (
              <p>{char.strength}</p>
            ) : (
              <p className="text-white/60">No strengths added yet.</p>
            )}
          </Section>

          <Section title="Weaknesses">
            {char.weakness ? (
              <p>{char.weakness}</p>
            ) : (
              <p className="text-white/60">No weaknesses added yet.</p>
            )}
          </Section>

          <Section title="Quick Info">
            <ul className="space-y-2">
              <li className="flex items-center justify-between gap-4">
                <span className="text-white/60">Character</span>
                <span className="text-white/85">{char.name}</span>
              </li>

              <li className="flex items-center justify-between gap-4">
                <span className="text-white/60">Role</span>
                <span className="text-white/85">{char.role ?? "Character"}</span>
              </li>

              <li className="flex items-center justify-between gap-4">
                <span className="text-white/60">Stats</span>
                <span className="text-white/85">
                  {typeof char.stats === "number" ? char.stats : "N/A"}
                </span>
              </li>

              <li className="flex items-center justify-between gap-4">
                <span className="text-white/60">Show</span>
                <span className="text-white/85">
                  {char.anime?.title ?? "Unknown"}
                </span>
              </li>
            </ul>
          </Section>
        </div>

        {!hasExtra ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-sm text-white/70">
              This character page is ready — add abilities/strengths/weaknesses in
              your seed (or admin form) to make it look even better.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
