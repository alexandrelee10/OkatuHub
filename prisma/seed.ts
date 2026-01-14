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
      image: "/assets/Anime/bleach_v2.png",
      genre: "Action, Shounen, Supernatural",
    },
    {
      title: "Jujutsu Kaisen",
      summary:
        "Yuji Itadori becomes a jujutsu sorcerer after ingesting a cursed object belonging to Sukuna.",
      creator: "Gege Akutami",
      ep_count: 24,
      season: 1,
      image: "/assets/Anime/jjk_v2.png",
      genre: "Action, Dark Fantasy, Supernatural",
    },
    {
      title: "Demon Slayer",
      summary:
        "Tanjiro Kamado joins the Demon Slayer Corps after his family is slaughtered by demons.",
      creator: "Koyoharu Gotouge",
      ep_count: 26,
      season: 1,
      image: "/assets/Anime/demon_slayer_v2.png",
      genre: "Action, Historical, Supernatural",
    },
    {
      title: "Naruto Shippuden",
      summary:
        "Naruto Uzumaki returns to Konoha after training with Jiraiya and continues his journey to become Hokage.",
      creator: "Masashi Kishimoto",
      ep_count: 500,
      season: 13,
      image: "/assets/Anime/naruto.png",
      genre: "Action, Adventure, Comedy",
    },
    {
      title: "Solo Leveling",
      summary:
        "A low-ranked player becomes the strongest in the game world.",
      creator: "Choi Seung-hoon",
      ep_count: 26,
      season: 1,
      image: "/assets/Anime/solo_leveling.png",
      genre: "Action, Fantasy, Game",
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
