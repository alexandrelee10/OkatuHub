// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const animeList = [
    {
      title: "Bleach: Thousand-Year Blood War",
      summary:
        "Ichigo Kurosaki returns to protect Karakura Town as the Quincy Empire invades Soul Society.",
      creator: "Tite Kubo",
      ep_count: 52,
      season: 1,
      // just store a string; later your UI can map it to an actual asset
      image: "/images/anime/bleach-tybw.jpg",
      genre: "Action, Shounen, Supernatural",
    },
    {
      title: "Jujutsu Kaisen",
      summary:
        "Yuji Itadori becomes a jujutsu sorcerer after ingesting a cursed object belonging to Sukuna.",
      creator: "Gege Akutami",
      ep_count: 24,
      season: 1,
      image: "/images/anime/jujutsu-kaisen.jpg",
      genre: "Action, Dark Fantasy, Supernatural",
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba",
      summary:
        "Tanjiro Kamado joins the Demon Slayer Corps after his family is slaughtered by demons.",
      creator: "Koyoharu Gotouge",
      ep_count: 26,
      season: 1,
      image: "/images/anime/demon-slayer.jpg",
      genre: "Action, Historical, Supernatural",
    },
  ];

  for (const anime of animeList) {
    await prisma.anime.upsert({
      where: { title: anime.title }, // make sure title is @unique in your schema
      update: {},
      create: anime,
    });
  }

  console.log("✅ Seeded anime list");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
